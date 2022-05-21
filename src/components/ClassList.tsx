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

export const ClassList = (): JSX.Element => {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    useEffect(() => {
        //Fetch data
        const fetchTeachers = async () => {
          const response = await fetch('/api/teachers');
          const teachers = await response.json();
          setTeachers(teachers.data);
      };
      fetchTeachers();
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const teacherId = parseInt(form.teacher.value);

      try {
          const response = await fetch(`/api/teachers/${teacherId}/classes`);
          const elem = document.getElementById('classes');
          const data = await response.json();

          if (!data.data || data.data?.length == 0) {
            elem.innerHTML = '<p>There are no classes.</p>';
          } else {
            // TODO: I know, the UI is not nice
            elem.innerHTML = `<div><p>There are ${data.data.length} classes</p></div>`;
            for(let i=0; i<data.data.length; i++) {
              elem.innerHTML += `<div>
              <p>Class name: ${data.data[i]?.name}</p>
              <p>Room: ${data.data[i]?.room.name}</p>
              <p>Session Day: ${data.data[i]?.session.day}</p>
              <p>Session Time: ${data.data[i]?.session.startTime}</p>
              <p>--</p>
              </div>`;
            }
          }

          
      } catch (error) {
          console.error(error.code);
          alert(`Error: ${error.message}`);
      }
  };

    return (
        <Box p={8} sx={{ maxWidth: 900, mx: 'auto' }}>
            <Heading mb={6}>All classes by a teacher</Heading>
            <Box as="form" onSubmit={handleSubmit}>
              <Select name="teacher" id="teacher" mb={3} required>
                  <option value="">Select an option...</option>
                  {teachers?.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                      </option>
                  ))}
              </Select>
              <Button sx={{ mt: 6 }}>Show</Button>
            </Box>
            <div id="classes"></div>
        </Box>
    );
};

ClassList.displayName = 'ClassList';
