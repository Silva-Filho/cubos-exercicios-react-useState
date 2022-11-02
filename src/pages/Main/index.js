import React, { useState } from "react";

import "./style.css";

export function Main() {
    const [ tasks, setTasks ] = useState( [] );

    function handleAddTask( event ) {
        const content = event.target.value;

        if ( event.key !== "Enter" || content === "" ) {
            return;
        }

        const localTasks = [ ...tasks ];

        const newTask = {
            id: localTasks.length ? localTasks[ localTasks.length - 1 ].id + 1 : 1,
            name: content,
            done: false
        };

        localTasks.push( newTask );

        // @ts-ignore
        setTasks( localTasks );

        event.target.value = "";
    }

    function handleDeleteTask( taskId ) {
        const localTasks = [ ...tasks ];

        const taskIndex = localTasks.findIndex( ( task ) => task.id === taskId );

        if ( taskIndex === -1 ) {
            return;
        }

        localTasks.splice( taskIndex, 1 );

        // @ts-ignore
        setTasks( localTasks );
    }

    function handleChangeStatus( taskId ) {
        const localTasks = [ ...tasks ];

        const findTask = localTasks.find( ( task ) => task.id === taskId );

        if ( !findTask ) {
            return;
        }

        findTask.done = !findTask.done;

        // @ts-ignore
        setTasks( localTasks );
    }

    return (
        <div className="container">
            <div>
                <input
                    type="text"
                    placeholder="Adicionar nova tarefa"
                    onKeyDown={ ( event ) => handleAddTask( event ) }
                />
            </div>

            <div>
                <ul>
                    { tasks.map( ( task ) => (
                        // @ts-ignore
                        <li key={ task.id }>
                            <span
                                // @ts-ignore
                                className={ `${ task.done && "task-done" }` }
                                // @ts-ignore
                                onClick={ () => handleChangeStatus( task.id ) }
                            >

                                {
                                    // @ts-ignore 
                                    task.name
                                }
                            </span>
                            <button
                                className="btn-del"
                                // @ts-ignore
                                onClick={ () => handleDeleteTask( task.id ) }
                            >
                                X
                            </button>
                        </li>
                    ) ) }
                </ul>
            </div>
        </div>
    );
}
