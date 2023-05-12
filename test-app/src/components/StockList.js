import React, { useEffect, useState } from 'react';
import getStocks from '../api/stockApi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import '../styles/style.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const totalData = 20;
  const totalPages = Math.ceil(totalData / perPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStocks();
        setStocks(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchData();
  }, []);

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedStocks = Array.from(stocks);
    const [movedStock] = reorderedStocks.splice(result.source.index, 1);
    reorderedStocks.splice(result.destination.index, 0, movedStock);

    setStocks(reorderedStocks);
  };

  const visibleData = stocks.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className='stockMain'>
      <h1>Таблица отчетов</h1>
      {stocks.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <table className='stockTable' border={1} cellSpacing={0}>
            <Droppable droppableId="stockList">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {visibleData.map((stock, index) => (
                    <Draggable key={stock.symbol} draggableId={stock.symbol} index={index}>
                      {(provided) => (
                        <tr
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <td>{index + 1}</td>
                          <td>{stock.symbol}</td>
                          <td>{stock.companyName}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      ) : (
        <p>No data available</p>
      )}
      <div>
        <button disabled={currentPage === 1 || stocks.length === 0} onClick={handleClickPrev} className='stockBtn'>
          Prev
        </button>
        <button disabled={currentPage === totalPages || stocks.length === 0} onClick={handleClickNext} className='stockBtn'>
          Next
        </button>
      </div>
    </div>
  );
};

export default StockList;
