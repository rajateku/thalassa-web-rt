import React, { useState } from 'react';

function Example() {
  const [showForm, setShowForm] = useState(false);

  const showFormf = () => {
    setShowForm(!showForm);
  }

  return (
    <div>
      <form>
        <button onClick={showFormf}></button>
      </form>

      {showForm && (
            <form>
            <select value="mycar" >
              <option value="Ford">Ford</option>
              <option value="Volvo">Volvo</option>
              <option value="Fiat">Fiat</option>
            </select>
          </form>
      )}
    </div>
  )
}

export default Example