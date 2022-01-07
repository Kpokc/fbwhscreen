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
        let sortedTitles = [... new Set(titleArray)];

        return sortedTitles;
    }

    // Return column with an orders or null
    function checkIfOrderInList(titleList, jobTitle) {
        return (
            titleList.map(el => {
                if (el === jobTitle) {
                    let getAllJobs = getOrdersIntoColumn(ordersList, jobTitle);
                    return (    
                        <div className="col" key={jobTitle}>
                            <h4>{jobTitle}</h4>
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
                            <div className="card-header">{el[4]}:{el[2]} UID:({el[0]})</div>
                            <div className="card-body">
                                <h5 className="card-title">{el[7]}</h5>
                                <span className="card-text pt-1">placed: {el[5]}</span>
                                <p className="card-text pt-1">{el[3]}</p>
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

        let picks = checkIfOrderInList(getTitles(titleArray), 'pick');
        let receipt = checkIfOrderInList(getTitles(titleArray), 'receipt');
        let collection = checkIfOrderInList(getTitles(titleArray), 'collection');
        let delivery = checkIfOrderInList(getTitles(titleArray), 'delivery');
        let transfer = checkIfOrderInList(getTitles(titleArray), 'transfer');
        let other = checkIfOrderInList(getTitles(titleArray), 'other');

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