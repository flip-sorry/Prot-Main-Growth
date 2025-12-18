import { useState, useEffect, useRef } from 'react';
import { colors, spacing, typography } from '../../../tokens';
import { cn } from '../../../utils/cn';
import { CloseIcon, CalendarIcon, ScheduleIcon, ChevronLeftIcon, ChevronRightIcon } from '../../../assets/icons';
import { Button } from '../Button';

interface BookingInterfaceProps {
  onClose: () => void;
  onBack: () => void;
}

interface DateOption {
  month: string;
  day: number;
  date: Date;
  isDisabled: boolean;
}

export default function BookingInterface({ onClose, onBack }: BookingInterfaceProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const [hoveredDateIndex, setHoveredDateIndex] = useState<number | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  // Generate date options (starting from today, showing next 5 days)
  const generateDateOptions = (): DateOption[] => {
    const dates: DateOption[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateNormalized = new Date(date);
      dateNormalized.setHours(0, 0, 0, 0);
      const isDisabled = dateNormalized.getTime() < today.getTime();
      
      dates.push({
        month: monthNames[date.getMonth()],
        day: date.getDate(),
        date: date,
        isDisabled: isDisabled,
      });
    }
    
    return dates;
  };

  const dateOptions = generateDateOptions();
  const timeSlots = ['11:00 am', '1:30 pm', '2:30 pm', '4:00 pm', '4:30 pm', '5:00 pm'];

  const isSubmitDisabled = !selectedDate || !selectedTime;

  const handleDateSelect = (date: Date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
    setSelectedDate(normalizedDate);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (!isSubmitDisabled) {
      // TODO: Handle booking submission
      console.log('Booking submitted:', { date: selectedDate, time: selectedTime });
      // Could close the panel or show success message
    }
  };

  // Check if content is scrollable
  useEffect(() => {
    const checkScrollability = () => {
      if (scrollableContentRef.current) {
        const { scrollHeight, clientHeight } = scrollableContentRef.current;
        setIsContentScrollable(scrollHeight > clientHeight);
      }
    };

    // Check initially with a small delay to ensure DOM is ready
    const initialTimeout = setTimeout(checkScrollability, 0);

    // Use ResizeObserver to detect content size changes
    let resizeObserver: ResizeObserver | null = null;
    
    if (scrollableContentRef.current) {
      resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(scrollableContentRef.current);
    }

    // Also check when selections change
    const selectionTimeout = setTimeout(checkScrollability, 100);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(selectionTimeout);
      resizeObserver?.disconnect();
    };
  }, [selectedDate, selectedTime]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between p-3 shrink-0",
        isContentScrollable && "border-b border-[#e4e4e4]"
      )}>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBack();
            }}
            className={cn(
              'w-8 h-8',
              'flex items-center justify-center',
              'rounded-[6px]',
              'hover:bg-gray-100',
              'transition-colors duration-150',
              'focus:outline-none',
              'focus:ring-2',
              'focus:ring-offset-1',
              'focus:ring-[#248567]'
            )}
            aria-label="Back"
          >
            <ChevronLeftIcon size={20} color="#2f2f2f" />
          </button>
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize.base, // 16px
              lineHeight: '22px',
              color: colors.text.dark, // #2f2f2f
              fontWeight: typography.fontWeight.semibold,
              margin: 0,
            }}
          >
            Book a demo
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={cn(
            'w-8 h-8',
            'flex items-center justify-center',
            'rounded-[6px]',
            'hover:bg-gray-100',
            'transition-colors duration-150',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-offset-1',
            'focus:ring-[#248567]'
          )}
          aria-label="Close"
        >
          <CloseIcon size={20} />
        </button>
      </div>

      {/* Content */}
      <div
        ref={scrollableContentRef}
        className="flex-1 overflow-y-auto overflow-x-hidden min-h-0"
        style={{
          paddingTop: 0,
          paddingBottom: spacing[3], // 12px
          paddingLeft: spacing[4], // 16px
          paddingRight: spacing[4], // 16px
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: spacing[8], // 32px
            paddingTop: 0,
          }}
        >
          {/* Description */}
          <p
            style={{
              fontFamily: typography.fontFamily.graphik,
              fontSize: typography.fontSize['13px'], // 13px
              lineHeight: '16px',
              color: colors.text.light, // #474747
              fontWeight: typography.fontWeight.normal,
              margin: 0,
            }}
          >
            Schedule your personalized 15min walkthrough.
          </p>

          {/* Date Selection Section */}
          <div className="flex flex-col" style={{ gap: spacing[2] }}> {/* 8px */}
            <div className="flex items-start gap-1">
              <CalendarIcon size={16} color="#767676" />
              <p
                style={{
                  fontFamily: typography.fontFamily.graphik,
                  fontSize: typography.fontSize.sm, // 14px
                  lineHeight: '17px',
                  color: colors.text.dark, // #2f2f2f
                  fontWeight: typography.fontWeight.semibold,
                  margin: 0,
                }}
              >
                Select a date:
              </p>
            </div>

            {/* Date Picker */}
            <div className="flex items-center gap-1">
              <button
                className="flex items-center justify-center shrink-0"
                style={{ width: '16px', height: '16px' }}
                aria-label="Previous dates"
              >
                <ChevronLeftIcon size={16} color="#adadad" />
              </button>

              <div className="flex gap-1 flex-1 min-w-0 overflow-x-auto">
                {dateOptions.map((dateOption, index) => {
                  const normalizedOptionDate = new Date(dateOption.date);
                  normalizedOptionDate.setHours(0, 0, 0, 0);
                  const normalizedSelectedDate = selectedDate ? new Date(selectedDate) : null;
                  if (normalizedSelectedDate) {
                    normalizedSelectedDate.setHours(0, 0, 0, 0);
                  }
                  const isSelected = normalizedSelectedDate?.getTime() === normalizedOptionDate.getTime();
                  const isHovered = !dateOption.isDisabled && hoveredDateIndex === index;
                  const shouldShowGreen = !dateOption.isDisabled && (isSelected || isHovered);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!dateOption.isDisabled) {
                          handleDateSelect(dateOption.date);
                        }
                      }}
                      onMouseEnter={() => {
                        if (!dateOption.isDisabled) {
                          setHoveredDateIndex(index);
                        }
                      }}
                      onMouseLeave={() => setHoveredDateIndex(null)}
                      disabled={dateOption.isDisabled}
                      className={cn(
                        'flex flex-col items-center justify-end',
                        'rounded-[4px]',
                        'transition-colors duration-150',
                        'shrink-0',
                        dateOption.isDisabled && 'opacity-50 cursor-not-allowed',
                        !dateOption.isDisabled && 'cursor-pointer'
                      )}
                      style={{
                        paddingLeft: spacing[3], // 12px
                        paddingRight: spacing[3], // 12px
                        paddingTop: spacing[2], // 8px
                        paddingBottom: spacing[2], // 8px
                        border: shouldShowGreen
                          ? `1px solid ${colors.primary.base}`
                          : '1px solid #e4e4e4',
                        backgroundColor: isSelected ? colors.primary.light : 'transparent',
                        flex: '1 1 0',
                        minWidth: 0,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: typography.fontFamily.graphik,
                          fontSize: typography.fontSize.xs, // 12px
                          lineHeight: '15px',
                          color: shouldShowGreen 
                            ? colors.primary.base 
                            : (dateOption.isDisabled ? colors.text.lighter : colors.text.lighter), // Green when selected/hovered, gray otherwise
                          fontWeight: typography.fontWeight.normal,
                          margin: 0,
                          letterSpacing: '1.2px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {dateOption.month}
                      </p>
                      <p
                        style={{
                          fontFamily: typography.fontFamily.graphik,
                          fontSize: typography.fontSize.base, // 16px
                          lineHeight: '22px',
                          color: shouldShowGreen 
                            ? colors.primary.base 
                            : (dateOption.isDisabled ? colors.text.lighter : colors.text.light), // Green when selected/hovered, gray when disabled, normal otherwise
                          fontWeight: typography.fontWeight.normal,
                          margin: 0,
                        }}
                      >
                        {dateOption.day}
                      </p>
                    </button>
                  );
                })}
              </div>

              <button
                className="flex items-center justify-center shrink-0"
                style={{ width: '16px', height: '16px' }}
                aria-label="Next dates"
              >
                <ChevronRightIcon size={16} color="#767676" />
              </button>
            </div>
          </div>

          {/* Time Selection Section */}
          <div className="flex flex-col" style={{ gap: spacing[4] }}> {/* 16px */}
            <div className="flex items-start gap-1">
              <ScheduleIcon size={16} color="#767676" />
              <p
                style={{
                  fontFamily: typography.fontFamily.graphik,
                  fontSize: typography.fontSize.sm, // 14px
                  lineHeight: '17px',
                  color: colors.text.dark, // #2f2f2f
                  fontWeight: typography.fontWeight.semibold,
                  margin: 0,
                }}
              >
                Select a time:
              </p>
            </div>

            {/* Time Slots Grid */}
            <div className="flex flex-col" style={{ gap: spacing[2] }}> {/* 8px */}
              {[0, 2, 4].map((startIndex) => (
                <div key={startIndex} className="flex gap-2">
                  {timeSlots.slice(startIndex, startIndex + 2).map((time) => {
                    const isSelected = selectedTime === time;
                    const isHovered = hoveredTime === time;
                    const shouldShowGreen = isSelected || isHovered;
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        onMouseEnter={() => setHoveredTime(time)}
                        onMouseLeave={() => setHoveredTime(null)}
                        className={cn(
                          'flex-1',
                          'flex items-center justify-center',
                          'h-10',
                          'rounded-[4px]',
                          'transition-colors duration-150',
                          'border'
                        )}
                        style={{
                          border: shouldShowGreen
                            ? `1px solid ${colors.primary.base}`
                            : '1px solid #e4e4e4',
                          backgroundColor: isSelected ? colors.primary.light : 'transparent',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: typography.fontFamily.graphik,
                            fontSize: typography.fontSize.sm, // 14px
                            lineHeight: '17px',
                            color: shouldShowGreen ? colors.primary.base : colors.text.light, // Green when selected or hovered, #474747 otherwise
                            fontWeight: typography.fontWeight.normal,
                            margin: 0,
                          }}
                        >
                          {time}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div
        className="shrink-0"
        style={{
          paddingTop: spacing[4], // 16px
          paddingBottom: spacing[4], // 16px
          paddingLeft: spacing[4], // 16px
          paddingRight: spacing[4], // 16px
        }}
      >
        <Button
          variant="primary"
          size="lg"
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          className="w-full"
        >
          Book demo
        </Button>
      </div>
    </div>
  );
}

