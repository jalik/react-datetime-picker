/*
 * The MIT License (MIT)
 * Copyright (c) 2021 Karl STEIN
 */

import {
  bool,
  func,
  oneOf,
  string,
} from 'prop-types';
import React, {
  useCallback,
  useMemo,
} from 'react';
import { getDefaultLanguage } from '../lib';
import {
  CALENDAR_MODE_DAY,
  CALENDAR_MODE_MONTH,
  CALENDAR_MODE_TIME,
  CALENDAR_MODE_YEAR,
} from '../modes';
import useCalendar from '../useCalendar';
import CalendarDays from './CalendarDays';
import CalendarMonths from './CalendarMonths';
import CalendarProvider from './CalendarProvider';
import CalendarTime from './CalendarTime';
import CalendarYears from './CalendarYears';

function Calendar(props) {
  const {
    date,
    disabled,
    locale,
    mode,
    onChange,
    renderDay,
    selectedDate,
    showTimeZone,
    showWeekNumbers,
  } = props;

  const context = useCalendar({
    date,
    locale,
    mode,
    selectedDate,
  });
  const { state } = context;

  const handleChange = useCallback((dateTime) => {
    if (!disabled) {
      onChange(dateTime.toISO());
    }
  }, [disabled, onChange]);

  const days = useMemo(() => {
    if (state.mode === CALENDAR_MODE_DAY) {
      return (
        <CalendarDays
          onChange={handleChange}
          renderDay={renderDay}
          showTimeZone={showTimeZone}
          showWeekNumbers={showWeekNumbers}
        />
      );
    }
    if (state.mode === CALENDAR_MODE_MONTH) {
      return (
        <CalendarMonths onChange={handleChange} />
      );
    }
    if (state.mode === CALENDAR_MODE_YEAR) {
      return (
        <CalendarYears onChange={handleChange} />
      );
    }
    if (state.mode === CALENDAR_MODE_TIME) {
      return (
        <CalendarTime
          onChange={handleChange}
          showTimeZone={showTimeZone}
        />
      );
    }
    return null;
  }, [handleChange, renderDay, showTimeZone, showWeekNumbers, state.mode]);

  return (
    <CalendarProvider context={context}>
      <div className="DateTimeInput-Calendar-Wrapper">
        <div className="DateTimeInput-Calendar-Bkg" />
        <fieldset
          className="DateTimeInput-Calendar"
          disabled={disabled}
        >
          {days}
        </fieldset>
      </div>
    </CalendarProvider>
  );
}

Calendar.propTypes = {
  date: string,
  disabled: bool,
  locale: string,
  mode: oneOf([
    CALENDAR_MODE_DAY,
    CALENDAR_MODE_MONTH,
    CALENDAR_MODE_TIME,
    CALENDAR_MODE_YEAR,
  ]),
  onChange: func.isRequired,
  renderDay: func,
  selectedDate: string,
  showTimeZone: bool,
  showWeekNumbers: bool,
};

Calendar.defaultProps = {
  date: null,
  disabled: false,
  locale: getDefaultLanguage(),
  mode: CALENDAR_MODE_DAY,
  renderDay: null,
  selectedDate: null,
  showTimeZone: false,
  showWeekNumbers: false,
};

export default Calendar;
