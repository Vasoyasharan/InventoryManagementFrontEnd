// import React from "react";
// import "../Css/Dashboard.css";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   return (
//     <>
//       <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
//         <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="#">
//           Your Own Shop
//         </Link>
//         <button
//           className="navbar-toggler position-absolute d-md-none collapsed"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#sidebarMenu"
//           aria-controls="sidebarMenu"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         />
//         <div className="navbar-nav">
//           <div className="nav-item text-nowrap">
//             <Link className="nav-link px-3" to="#" onClick={()=> {localStorage.clear()}}>
//               Sign out
//             </Link>
//           </div>
//         </div>
//       </header>

//       <div className="container-fluid">
//         <div className="row">
//           <nav
//             id="sidebarMenu"
//             className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
//           >
//             <div className="position-sticky pt-3">
//               <ul className="nav flex-column">
//                 <li className="nav-item">
//                   <Link className="nav-link" aria-current="page" to="#">
//                     <span data-feather="home"></span>
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="#">
//                     <span data-feather="file"></span>
//                     Orders
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="#">
//                     <span data-feather="shopping-cart"></span>
//                     Products
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="#">
//                     <span data-feather="users"></span>
//                     Customers
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="#">
//                     <span data-feather="bar-chart-2"></span>
//                     Reports
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="#">
//                     <span data-feather="layers"></span>
//                     Integrations
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </nav>

//           <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//             <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//               <h1 className="h2">Dashboard</h1>
//               <div className="btn-toolbar mb-2 mb-md-0">
//                 <div className="btn-group me-2">
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-secondary"
//                   >
//                     Share
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-secondary"
//                   >
//                     Export
//                   </button>
//                 </div>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary dropdown-toggle"
//                 >
//                   <span data-feather="calendar"></span>
//                   This week
//                 </button>
//               </div>
//             </div>

//             <canvas
//               className="my-4 w-100"
//               id="myChart"
//               width="900"
//               height="380"
//             ></canvas>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;

import React from "react"

const Dashboard = (props) => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
        <h3 className="m-0">{props.name}</h3>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
