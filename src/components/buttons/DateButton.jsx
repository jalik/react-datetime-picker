/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import React, {
  useCallback,
  useMemo,
} from 'react';
import { ACTION_SET_MODE } from '../../calendarReducer';
import { CALENDAR_MODE_DAY } from '../../modes';
import { useCalendarContext } from '../CalendarProvider';

function DateButton() {
  const { state, dispatch } = useCalendarContext();

  const dateTime = useMemo(() => (
    state.selectedDateTime || state.dateTime
  ), [state.dateTime, state.selectedDateTime]);

  const handleClickTime = useCallback(() => {
    dispatch({ type: ACTION_SET_MODE, data: { mode: CALENDAR_MODE_DAY } });
  }, [dispatch]);

  return (
    <button
      className="DateTimeInput-CalendarHeader-Day"
      onClick={handleClickTime}
      type="button"
    >
      {dateTime.toFormat('DD')}
    </button>
  );
}

export default DateButton;
