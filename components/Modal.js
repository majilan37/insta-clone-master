import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import {Dialog, Transition} from '@headlessui/react'
import { Fragment, useRef, useState } from "react"
import { CameraIcon } from "@heroicons/react/solid"
import {db, storage} from "../firebase"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore"
import { useSession } from "next-auth/react"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

function Modal() {
    const { data: session } = useSession()
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const filePicker = useRef()
    const captionRef = useRef()

    const addImgToPost = (e) => {
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (event) => {
            setSelectedFile(event.target.result)
        }
    }

    const uploadPost = async (e) => {
        e.preventDefault()
        if (loading) return;

        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.name,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        console.log('New doc add to the DB', docRef.id);

        const imgRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imgRef, selectedFile, 'data_url').then(async (snapshot) => {
            const downloadUrl = await getDownloadURL(imgRef)
            await updateDoc(doc(db, 'posts', docRef.id), {
                image: downloadUrl,
            })
        })

        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog 
                as='div'
                className='fixed z-10 inset-0 overflow-y-auto'
                onClose={() => setOpen(false)}
            >
            <div className='flex items-end justify-center min-h-[800px] 
                sm:h-screen pt-4 px-4 pb-28 text-center sm:block sm:p-0' >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo='opacity-100'
                    leave="ease-in duration-200"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>
                <span 
                    className='hidden sm:inline-block sm:align-middle sm:h-screen' 
                    aria-hidden='true'
                >
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave="ease-in duration-200"
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left 
                    overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
                    >
                        <div>
                            {!selectedFile ? (
                                <div 
                                    onClick={() => filePicker.current.click()}
                                    className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'>
                                    <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                            ) : (
                                <img className="w-full object-contain cursor-pointer"  onClick={() => setSelectedFile(null)} src={selectedFile} alt="" />
                            ) }
                            <div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                        Upload a Photo
                                    </Dialog.Title>
                                </div>
                            </div>
                            <div>
                                <input 
                                    type="file" 
                                    ref={filePicker} 
                                    hidden 
                                    onChange={addImgToPost} 
                                />
                            </div>
                            <div className="mt-2">
                                <input 
                                    type="text" 
                                    className='border-none focus:ring-0 w-full text-center'
                                    placeholder="Please enter a caption..."
                                    ref={captionRef}
                                />
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    onClick={uploadPost}
                                    type='button'
                                    disabled={loading || !selectedFile}
                                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 
                                    bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:right-2 ring-offset-2 ring-red-500 sm:text-sm
                                    disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300'
                                >
                                    {!loading ? 'Upload post' : 'Uploading...'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition.Root>
    )
}

export default Modal
