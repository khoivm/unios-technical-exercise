import React, { useEffect, useState } from 'react';
import { ThemeUICSSObject } from '@theme-ui/css';
import { Box, Heading } from '@theme-ui/components';
import { Label, Input, Select, Button } from 'theme-ui';
import { Teacher } from '@/domain/teacher';
import { Room } from '@/domain/room';
import { SessionDay } from '@/domain/session';

const range = (length) => Array.from(Array(length).keys()).map((i) => ++i);
// TODO: hours and days here should be extracted from table "sessions"
// TODO: handle errors when the day and hour combination does not exist in table "sessions"
const hours = range(24);
const days: SessionDay[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const labelStyle: ThemeUICSSObject = { display: 'block', mt: 4, mb: 2 };

export const BookingForm = (): JSX.Element => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        //Fetch data
        const fetchTeachers = async () => {
            const response = await fetch('/api/teachers');
            const teachers = await response.json();
            setTeachers(teachers.data);
        };
        fetchTeachers();

        const fetchRooms = async () => {
            const response = await fetch('/api/rooms');
            const rooms = await response.json();
            setRooms(rooms.data);
        };
        fetchRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const data = {
            name: form.name.value,
            teacher: {id: parseInt(form.teacher.value)},
            session: {id: `${form.day.value}-${form.hour.value}00`},
            room: {id: parseInt(form.room.value)},
        };
        const JSONdata = JSON.stringify(data);

        //submit to some booking endpoint
        try {
            const response = await fetch('/api/lessons', {
                method: 'POST',
                body: JSONdata,
            });
            
            const data = await response.json();

            if (data.success) {
                alert('Booking successful');
            } else if (data.status) {
                alert('Booking successful');
            } else {
                alert(`Booking failed: ${data.message}`);
            }
        } catch (error) {
            console.error(error.code);
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
                <Input name="name" id="name" mb={3} autoComplete="off" required/>
                <Label sx={labelStyle} htmlFor="teacher">
                    Teacher
                </Label>
                <Select name="teacher" id="teacher" mb={3} required>
                    <option value="">Select an option...</option>
                    {teachers?.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
                        </option>
                    ))}
                </Select>
                <Label sx={labelStyle} htmlFor="day">
                    Day
                </Label>
                <Select name="day" id="day" mb={3} required>
                    <option value="">Select an option...</option>
                    {days?.map((day) => (
                        <option key={day} value={day.toLowerCase()}>
                            {day}
                        </option>
                    ))}
                </Select>
                <Label sx={labelStyle} htmlFor="hour">
                    Start hour
                </Label>
                <Select name="hour" id="hour" mb={3} required>
                    <option value="">Select an option...</option>
                    {hours?.map((hour) => (
                        <option key={hour} value={hour.toString().padStart(2,'0')}>
                            {hour}:00
                        </option>
                    ))}
                </Select>
                <Label sx={labelStyle} htmlFor="room">
                    Room
                </Label>
                <Select name="room" id="room" mb={3} required>
                    <option value="">Select a room...</option>
                    {rooms?.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name} ({room.roomCode})
                        </option>
                    ))}
                </Select>
                <Button sx={{ mt: 6 }}>Submit</Button>
            </Box>
        </Box>
    );
};

BookingForm.displayName = 'BookingForm';
