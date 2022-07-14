export const date = (dateOfAdmission) => {
    const newDate = new Date().toLocaleDateString();
    const dateFormat = newDate.split('.');
    const [day, month, year] = dateFormat;
    const currentDate = day.length === 1 ? `${year}-${month}-0${day}` : `${year}-${month}-${day}`;
    return dateOfAdmission !== '' ? dateOfAdmission : currentDate;
};


export const dateAndHour = () => {
    const newDate = new Date().toLocaleDateString();
    const hour = new Date().toLocaleTimeString();
    return `${newDate} ${hour}`;
};


