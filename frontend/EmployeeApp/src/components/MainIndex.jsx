import React from 'react'
import Dashboard from './Dashboard'

const MainIndex = () => {
  return (
    <div className='container'>
    <Dashboard/>
    <div className="container px-4 py-5" id="hanging-icons">
    <h2 className="pb-2 border-bottom border-top text-center text-success fw-bold mb-5">Welcome Admin!</h2>
    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      <div className="col d-flex align-items-start">
        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlink:href="#toggles2"></use></svg>
        </div>
        <div>
          <h2>See Employee</h2>
          <p className='fw-bold'>Click On The "Employee List" Navigation Link To See The All Employee's.</p>
          <a href="/employee" className="btn btn-outline-success btn-large">
            See Employee
          </a>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlink:href="#cpu-fill"></use></svg>
        </div>
        <div>
          <h2>Create Employee</h2>
          <p className='fw-bold'>Click On The "Create Employee" Navigation Link To Create New Employee's.</p>
          <a href="/create-employee" className="btn btn-outline-primary btn-large" >
           Create Now
          </a>
        </div>
      </div>
      <div className="col d-flex align-items-start">
        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
          <svg className="bi" width="1em" height="1em"><use xlink:href="#tools"></use></svg>
        </div>
        <div>
          <h2>Edit/Delete Employee</h2>
          <p className='fw-bold'>Click On The "Employee List" Navigation Link To Edit Or Delete The Existing Employee's.</p>
          <a href="/employee" className="btn btn-outline-danger btn-large">
            Edit/Delete Now
          </a>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default MainIndex