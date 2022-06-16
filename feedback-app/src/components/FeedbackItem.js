import { useContext } from "react"
import {FaTimes, FaEdit} from "react-icons/fa"
import Card from "../components/shared/Card"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackItem({item}) {
    const {handleEdit, handleDelete} = useContext(FeedbackContext)

    return (
        <Card>
            <div className='num-display'>{item.rating}</div>
            <button onClick={() => handleDelete(item.id)} className="close">
                <FaTimes color="purple"/>
            </button>
            <button onClick={() => handleEdit(item)} className="edit">
                <FaEdit color="purple"/>
            </button>
            <div className='text-display'>
                {item.text}
            </div>
        </Card>
    )
}



export default FeedbackItem