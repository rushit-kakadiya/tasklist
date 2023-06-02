import React, { FC } from 'react';

type Props = {
  handleFilterTasks: (e: any) => void;
};
const FilterStatus: FC<Props> = ({ handleFilterTasks }) => {
  return (
    <select name='status_filter' id='status_filter' onChange={handleFilterTasks}>
      <option value='all'>All tasks</option>
      <option value='true'>Done tasks</option>
      <option value='false'>Pending tasks</option>
    </select>
  );
};

export default FilterStatus;
