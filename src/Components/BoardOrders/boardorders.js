import React from "react";
import Loader from "../Loader";

import './boardorders.css'

export const BoardOrders = ({ordersList}) => {

    const titleArray = [];

    // Return unique job titles
    function getTitles(titleArray){
        ordersList.forEach((item) => {
            titleArray.includes(item[4], titleArray.push(item[4]));
        });
        const sortedTitles = [... new Set(titleArray)];

        return sortedTitles;
    }

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
                        <div className="card border-primary mb-3 mt-3" key={el[0]}>
                            <div className="card-header toUpperCae">{el[4]}: {el[2]} <span className="right">ID: {el[0]}</span></div>
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
        document.body.classList.add('bodyLoader');
        return (
            <Loader />
        );
    };
};

export default BoardOrders;