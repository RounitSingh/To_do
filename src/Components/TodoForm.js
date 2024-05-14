import React, {useState,useEffect,useRef} from 'react'

const TodoForm = (props) => {
   let val=props.edit ? props.edit.value : '' ;
   const [input,setInput]=useState(val);
   const inputRef=useRef(null);

   useEffect(() => {
   
      if (inputRef.current) {
       inputRef.current.focus();
       setTimeout(() => inputRef.current.focus(), 100);
 
      }
   }, []);



 
 const handleSubmit = e =>{
    props.onSubmit({
        id:Math.floor(Math.random()*10000),
        text:input
    });
    e.preventDefault();
    setInput('');
 }

 const handleChange=e=>{

    setInput(e.target.value);
 }

  return (
     <form className='todo-form ' onSubmit={handleSubmit}>
     {props.edit ? (
         <>
           <input 
               type='text' 
               placeholder='Update your item'
               value={input} 
               onChange={handleChange}
               name='text' 
               className='todo-input edit'>
              
            </input>
            <button className='todo-button edit'>Edit</button>
          </>
     ):
     (
      <>
          <input 
               type='text' 
               placeholder='Add a todo'
               value={input} 
               onChange={handleChange}
               name='text' 
               className='todo-input'>
               
            </input>
            <button className='todo-button'>ADD todo</button>
      
      </>
      )}
     
     </form>

    
  )
}

export default TodoForm