/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */

import { Reorder, AnimatePresence, motion } from 'framer-motion';
// eslint-disable-next-line import/order
import { useRef } from 'react';

// framer motion

// react-responsive
// eslint-disable-next-line import/no-unresolved
import { useMediaQuery } from 'react-responsive';

// components
import Todo from '../Todo/Todo';
import Filter from '../Filter/Filter';

// types
import { filter, todo } from '@/pages/Index';

interface todoListProps {
  todoList: Array<{ id: string; title: string; completed: boolean }>;
  setTodoList: React.Dispatch<React.SetStateAction<todo[]>>;
  filter: filter;
  setFilter: React.Dispatch<React.SetStateAction<filter>>;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
}

const TodoList = ({
  todoList,
  setTodoList,
  filter,
  setFilter,
  removeTodo,
  toggleTodo,
  clearCompleted,
}: todoListProps) => {
  const ref = useRef<HTMLUListElement>();

  // items left
  const itemsLeft = todoList.reduce(
    (acc, curr) => (!curr.completed ? ++acc : acc),
    0
  );

  // media query to change filter location
  const matches = useMediaQuery({ query: '(min-width: 600px)' });

  return (
    <AnimatePresence>
      {todoList.length > 0 && (
        <>
          <motion.div
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className={
              'overflow-hidden rounded-md bg-white shadow-[0_0.35rem_1rem] shadow-[rgba(0,0,0,0.15)] transition-[background-color] duration-500 dark:bg-veryDarkGrayishBlueD2 ' +
              (todoList.length > 0 ? 'mt-8' : '')
            }
          >
            <Reorder.Group
              axis="y"
              values={todoList}
              onReorder={setTodoList}
              className={'' + filter === 'all' ? 'cursor-grab' : ''}
              ref={ref}
            >
              <AnimatePresence>
                {todoList.map((item) => {
                  if (
                    filter === 'all' ||
                    (filter === 'completed' && item.completed) ||
                    (filter === 'active' && !item.completed)
                  ) {
                    return (
                      <Todo
                        key={item.id}
                        data={item}
                        removeTodo={removeTodo}
                        toggleTodo={toggleTodo}
                        containerRef={ref}
                        listFilter={filter}
                      />
                    );
                  }
                })}
              </AnimatePresence>
            </Reorder.Group>
            <motion.div
              layout
              className={
                'grid h-16 place-content-center rounded-md bg-white px-4 text-[14px] text-darkGrayishBlue transition-[background-color] duration-500 dark:bg-veryDarkGrayishBlueD2 dark:text-darkGrayishBlueD [&_button]:transition-[color] [&_button]:duration-500 hover:[&_button]:text-veryDarkGrayishBlue dark:hover:[&_button]:text-lightGrayishBlueHover ' +
                (matches ? 'grid-cols-3' : 'grid-cols-2')
              }
            >
              <p className=''>
                <span>{itemsLeft}</span> item{itemsLeft !== 1 && 's'} left
              </p>
              {matches && <Filter filter={filter} setFilter={setFilter} />}
              <div className="text-right">
                <button onClick={clearCompleted}>Clear Completed</button>
              </div>
            </motion.div>
          </motion.div>
          {!matches && (
            <motion.div
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              key="filter"
              className="mt-5 flex h-16 items-center justify-center rounded-md bg-white text-lg shadow-[0_0.35rem_1rem] shadow-[rgba(0,0,0,0.15)] transition-[background-color] duration-500 dark:bg-veryDarkGrayishBlueD2"
            >
              <Filter filter={filter} setFilter={setFilter} />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default TodoList;
