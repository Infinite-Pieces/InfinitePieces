import React from 'react';

const AnalyticBubble = ({ header, subheader, rate }) => {
    return(
        <div className="bg-gray-200 m-2 p-4 flex flex-col h-40 w-80">
            <div className="bg-gray-200 m-4 p-4 flex flex-col h-30 w-64 justify-center">
                <span className="font-bold flex-grow flex text-4xl ml-2">{header}</span>
                <span className="text-xl ml-2 flex-grow flex text-gray-700">{subheader}</span>
                <span className="text-sm ml-2 flew-grow flex text-gray-600">{rate}</span>
            </div>
        </div>
    );
};

export default AnalyticBubble;