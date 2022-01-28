import React from "react";
import Loader from "../Loader";
import ModalUpdate from "../ModalUpdate";
import ModalDelete from "../ModalDelete";

import './boardorders.css'

export const BoardOrders = ({ordersList, deleteCard}) => {

    const titleArray = [];

    // Return unique job titles
    function getTitles(titleArray){
        ordersList.forEach((item) => {
            titleArray.includes(item[4], titleArray.push(item[4]));
        });
        const sortedTitles = [...new Set(titleArray)];

        return sortedTitles;
    };

    // Return column with an orders or null
    function checkIfOrderInList(titleList, jobTitle) {
        return (
            titleList.map(el => {
                if (el === jobTitle) {
                    const getAllJobs = getOrdersIntoColumn(ordersList, jobTitle);
                    return (    
                        <div className="col" key={jobTitle}>
                            <h4 className="columnHeader toUpperCae mt-3">{jobTitle}<p className="m-0 smallFont">|</p></h4>
                            {getAllJobs}
                        </div>
                    );
                } else {
                    return null;
                };
            })
        );
    };
    
    // Return list of orders
    function getOrdersIntoColumn(ordersList, jobTitle) {
        return (
            ordersList.map((el) => {
                if (el[4] === jobTitle) {
                    return (
                        <div className={el[6] === true ? "card border-danger text-white bg-danger mb-3 mt-3" : "card border-primary mb-3 mt-3"} key={el[0]}>
                            <div className="card-header toUpperCae">
                                <span className="pickId">{el[4]}: {el[2]}</span>
                                
                                    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                        <div className="btn-group" role="group">
                                            <button id="btnGroupDrop1" type="button" className={el[6] === true ? "btn btn-danger dropdown-toggle" : "btn btn-primary dropdown-toggle"} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">

                                                {/* Delete and update buttons for office admins */}
                                                {!window.sessionStorage.getItem("logged_user").includes("ckearney") ? 
                                                    <div>
                                                        <div className="dropdown-item"><ModalUpdate propsIdValue={el[0]} propsVendor={el[7]}/></div>
                                                        <div className="dropdown-item"><ModalDelete propsIdValue={el[0]} propsVendor={el[7]}/></div> 
                                                    </div>
                                                    :
                                                    null
                                                }
                                                

                                                {/* Delete button for the TV screen */}
                                                {window.sessionStorage.getItem("logged_user").includes("ckearney") ? 
                                                    <div type="button" className="btn btn-outline-secondary floor-button" onClick={() => deleteCard(el[0])}>Delete</div> 
                                                    :
                                                    null
                                                }
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <span className="right">ID: {el[0]}</span>
                            </div>
                            
                            <div className="card-body">
                                <h5 className="card-title toCapitalLetter pt-0">{el[7]}</h5>
                                <span className="card-text pt-1 toCapitalLetter font14px">placed: {el[5]}</span>
                                <p className="card-text pt-1 font18px">{el[3]}</p>
                            </div>
                        </div>
                    );
                };
            })
        );
    };

    // Return null if ordersList is empty
    if (ordersList.length !== 0){

        document.body.classList.remove('bodyLoader');

        const picks = checkIfOrderInList(getTitles(titleArray), 'pick');
        const receipt = checkIfOrderInList(getTitles(titleArray), 'receipt');
        const collection = checkIfOrderInList(getTitles(titleArray), 'collection');
        const delivery = checkIfOrderInList(getTitles(titleArray), 'delivery');
        const transfer = checkIfOrderInList(getTitles(titleArray), 'transfer');
        const other = checkIfOrderInList(getTitles(titleArray), 'other');

        return (
            <>
                {picks}
                    {receipt}
                        {collection}
                        {delivery}
                    {transfer}
                {other}
            </>
        );

    } else {
        // Loader 
        document.body.classList.add('bodyLoader');
        return (
            <Loader />
        );
    };
};

export default BoardOrders;