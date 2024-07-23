import React from "react"

const Report = (props) => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
        <h3 className="m-0">{props.name}</h3>
      </div>
    </main>
  )
}

export default Report
