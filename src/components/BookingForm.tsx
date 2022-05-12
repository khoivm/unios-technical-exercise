import React, { useEffect, useState } from 'react';
import { ThemeUICSSObject } from '@theme-ui/css';
import { Box, Flex, Text, Heading, Paragraph } from '@theme-ui/components';
import Image from 'next/image';
import { Label, Input, Checkbox, Select, Textarea, Radio, Slider, Button } from 'theme-ui';
import { Room } from '@/domain/room';
import { Teacher } from '@/domain/teacher';
import { SessionDay } from '@/domain/session';

const range = (length) => Array.from(Array(length).keys()).map((i) => ++i);
const hours = range(24);
const days: SessionDay[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const labelStyle: ThemeUICSSObject = { display: 'block', mt: 4, mb: 2 };

export const BookingForm = (): JSX.Element => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    useEffect(() => {
        //Fetch data
        const fetchData = async () => {
            const response = await fetch('/api/rooms');
            const rooms = await response.json();
            setRooms(rooms.data);

            const response2 = await fetch('/api/teachers');
            const teachers = await response2.json();
            setTeachers(teachers.data);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        console.log('formData: ', formData);

        //submit to some booking endpoint
        try {
            const response = await fetch('/api/lessons', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                alert('Booking successful');
            } else {
                alert(`Booking failed: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <Box p={8} sx={{ maxWidth: 900, mx: 'auto' }}>
            <Heading mb={6}>Schedule a new lesson</Heading>
            <Box as="form" onSubmit={handleSubmit}>
                <Label sx={labelStyle} htmlFor="name">
                    Class Name
                </Label>
                <Input name="name" id="name" mb={3} autoComplete="off" />
                <Label sx={labelStyle} htmlFor="teacher">
                    Teacher
                </Label>
                <Select name="teacher" id="teacher" mb={3}>
                    <option value="">Select an option...</option>
                    {teachers?.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </Select>
                <Label sx={labelStyle} htmlFor="hour">
                    Start hour
                </Label>
                <Select name="hour" id="hour" mb={3}>
                    <option value="">Select an option...</option>
                    {hours?.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}:00
                        </option>
                    ))}
                </Select>
                <Label sx={labelStyle} htmlFor="day">
                    Day
                </Label>
                <Select name="day" id="day" mb={3}>
                    <option value="">Select an option...</option>
                    {days?.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </Select>
                <Button sx={{ mt: 6 }}>Submit</Button>
            </Box>
        </Box>
    );
};

BookingForm.displayName = 'BookingForm';
