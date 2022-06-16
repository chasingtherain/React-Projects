import { createContext,useState } from "react";
import {v4 as uuidv4} from "uuid"


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const[feedback,setFeedback] = useState([{
        id:1,
        text: "this is feedback item 1",
        rating: 10
    },{
        id:2,
        text: "this is feedback item 2",
        rating: 3
    },{
        id:3,
        text: "this is feedback item 3",
        rating: 7
    }
    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit: false
    })

    // delete existing feedback
    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")) setFeedback(feedback.filter((item) => item.id !== id))
      }
    
    // add feedback
    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    // edit existing feedback
    const handleEdit = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // update existing feedback
    const updateFeedback = (id, updateItem) => {
        setFeedback(feedback.map((item)=> (item.id === id) ? {...item, ...updateItem} : item))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        handleDelete,
        addFeedback,
        handleEdit,
        updateFeedback,
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext