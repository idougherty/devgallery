import styles from "styles/post.module.css";
import { BiCaretLeft, BiCaretRight, BiLoaderAlt, BiTrash, BiUpload } from "react-icons/bi";
import { useRef, useState } from "react";
import { Modal, ModalWrapper } from "pages/components/modal";

export default function ImageGroupComponent({ component, editable, setContent }) {
    const [uploadModal, setUploadModal] = useState(false);

    const handleCreate = (imageData) => {
        component.images.push(imageData);
        setContent();
    }

    const handleDelete = (idx) => {
        component.images.splice(idx, 1);
        setContent();
    }

    const handleMoveLeft = (idx) => {
        if(idx == 0)
            return;

        const tmp = component.images[idx];
        component.images[idx] = component.images[idx - 1]
        component.images[idx - 1] = tmp;
        
        setContent();
    }

    const handleMoveRight = (idx) => {
        if(idx == component.images.length - 1)
            return;

        const tmp = component.images[idx];
        component.images[idx] = component.images[idx + 1]
        component.images[idx + 1] = tmp;

        setContent();
    }

    return (
    <div className={ styles.imageGroup }>
        { editable &&
        <button className={styles.imageGroupEdit}
                onClick={ () => setUploadModal(true) }>
            <BiUpload />
        </button>
        }
        { uploadModal && 
            <ImageUploadModal createImage={ handleCreate } 
                closeFunction={ () => setUploadModal(false) }/>
        }
        {
        component.images.map((image, idx) =>
            <div className={styles.imageWrapper} key={ idx } >
                { editable &&
                <ImageControls 
                    handleDelete={    () => handleDelete(idx) }
                    handleMoveLeft={  () => handleMoveLeft(idx) }
                    handleMoveRight={ () => handleMoveRight(idx) } />
                }
                <img key={idx} 
                    src={image}
                    className={ styles.imageItem }/>
            </div>
        )
        }
    </div>
    );
}

function ImageControls({ handleDelete, handleMoveLeft, handleMoveRight }) {
    return (
    <div className={ styles.imageControls }>
        <BiCaretLeft  onClick={ handleMoveLeft } />
        <BiTrash      onClick={ handleDelete } />
        <BiCaretRight onClick={ handleMoveRight } />
    </div>
    )
}

function ImageUploadModal({ closeFunction, createImage }) {
    const form = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async function(e) {
        e.preventDefault();
        
        const image = form.current.image.files[0];
        console.log(image.size);

        if(!image)
            return setError("Error finding image.");

        if(image.size > 6000000)
            return setError("Please upload an image less than 6MB.");

        if(image.type != "image/jpeg" && image.type != "image/png")
            return setError("Please upload a PNG or JPG.");

        setLoading(true);
        var reader = new FileReader();
        await reader.readAsDataURL(image)

        reader.addEventListener("load", async (e) => {
            const base64Data = e.target.result
                .replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

            const imageData = {
                filename: image.name,
                data: base64Data,
                type: image.type,
                size: image.size,
            };

            const postId = window.location.pathname.split("/")[2];

            const res = await fetch(`/api/post/${postId}/image/upload`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(imageData),
            })

            const data = await res.json();

            setLoading(false);

            if(data.ok) {
                createImage(`/api/post/${postId}/image/${data.message}`);
                form.current.reset();
                closeFunction();
            } else {
                setError("There was an issue uploading your image.")
            }
            console.log(data.message);

        });
    }

    return (
    <ModalWrapper closeFunction={ closeFunction }>
        <Modal title="Upload Image:" closeFunction={ closeFunction }>
            <form ref={ form } onSubmit={ handleSubmit }>
                <input className={styles.upload}
                        type="file" 
                        name="image"
                        required /><br/>
                { error && <p>{ error }</p>}
                <button className={styles.submit} type="submit">
                    { loading && <BiLoaderAlt className="spinner" /> || <>Upload</>}
                </button>
            </form>
        </Modal>
    </ModalWrapper>
    )
}

export function createImageGroup() {
    return {
        type: "image group",
        images: []
    }
}