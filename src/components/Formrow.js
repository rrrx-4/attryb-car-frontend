const Formrow = ({ name, type, value, handleChange, labelText }) => {

    return <div>
        <label htmlFor={name} className="mb-2 font-medium text-gray-800 mr-4"  >{name}</label>
        <input className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type={type} name={name} value={value} onChange={handleChange}  ></input>
    </div>

}

export default Formrow;