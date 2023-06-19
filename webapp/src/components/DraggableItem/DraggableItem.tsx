import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { DraggableItemProps } from '../interfaces';

const DraggableItem = (props: DraggableItemProps) => (
    <div
        ref={props.draggableProvided.innerRef}
        {...props.draggableProvided.draggableProps}
        {...props.draggableProvided.dragHandleProps}
        className='bg-neutral-300 flex items-center justify-between mt-1 p-3 rounded w-full'
        data-testid={`draggable-container-${props.OrderID}`}
    >
        <span data-testid={`draggable-customerID-${props.OrderID}`}>{ props.CustomerID }</span>
        <span data-testid={`draggable-productID-${props.OrderID}`}>{ props.ProductID }</span>
        {(() => {
            const { OrderID, CustomerID, ProductID, OrderStatus, removeOrder } = props;
            return (
                <button onClick={() => removeOrder({ OrderID, CustomerID, ProductID, OrderStatus })}>
                    <FontAwesomeIcon
                        icon={OrderStatus === 'QA' ? faSquareCheck : faSquareXmark}
                        className={`${OrderStatus === 'QA' ? 'text-green-600' : 'text-red-600'} fa-lg`}
                        data-testid={`draggable-btn-${props.OrderID}`}
                    />
                </button>
            );
        })()}
    </div>
);

export default DraggableItem;