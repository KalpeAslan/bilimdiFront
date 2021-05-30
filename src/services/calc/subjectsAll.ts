import math from 'icons/subjects/Математика.svg';
import phys from 'icons/subjects/Физика.svg';
import geog from 'icons/subjects/География.svg';
import chem from 'icons/subjects/Химия.svg';
import biol from 'icons/subjects/Биология.svg';
import eng from 'icons/subjects/Ағылшын тілі.svg';
import hist from 'icons/subjects/Дүниежүзі тарихы.svg';
import russian from 'icons/subjects/Орыс тілі.svg';
import rusL from 'icons/subjects/Орыс әдебиеті.svg';
import kazL from 'icons/subjects/Қазақ әдебиті.svg';
import kaz from 'icons/subjects/Қазақ тілі.svg';
import law from 'icons/subjects/Адам.Қоғам.Құқық.svg';
import creat from 'icons/subjects/Шығармашылық емтихан.svg';

export default (lang: string = 'kz'): Array<Object>=>{
    return  [
        {
            name: 'Математика' ,
            short: 'Мат',
            share: ['Физ','Гео'],
            icon: math
        },
        {
            name: 'Физика',
            short: 'Физ',
            share: ['Мат','Хим'],
            icon:phys
        },
         {
            name: 'География',
            short: 'Гео',
            share: ['Мат','Био','Ист','Ино'],
            icon:geog
        },
        {
            name: 'Химия',
            short: 'Хим',
            share: ['Физ','Био'],
            icon:chem
        },
       {
            name: 'Биология',
            short: 'Био',
            share: ['Хим','Гео'],
            icon:biol
        },
       {
            name: lang === 'kz' ? 'Ағылшын тілі' : 'Английский язык',
            short: 'Ино',
            share: ['Ист','Гео'],
            icon:eng
        },
        {
            name: lang === 'kz' ? 'Дүниежүзі тарихы' :  'Всемирная история',
            short: 'Ист',
            share: ['Гео','Чоп','Ино'],
            icon:hist
        },
        {
            name: lang === 'kz' ? 'Орыс тілі' : 'Русский язык',
            short: 'Рус',
            share: ['РЛит'],
            icon:russian
        },
         {
            name: lang === 'kz' ? 'Орыс әдебиеті' : 'Русская литература',
            short: 'РЛит',
            share: ['Рус'],
            icon:rusL
        },
        {
            name: lang === 'kz' ? 'Қазақ әдебиті' : 'Казахская литература',
            short: 'КЛит',
            share: ['Каз'],
            icon:kazL
        },
        {
            name: lang === 'kz' ? 'Қазақ тілі' : 'Казахский язык',
            short: 'Каз',
            share: ['КЛит'],
            icon: kaz
        },
        {
            name: lang === 'kz' ? 'Адам.Қоғам.Құқық' : 'Человек.Общество.Право' ,
            short: 'Чоп',
            share: ['Ист'],
            icon: law
        },
        {
            name: lang === 'kz' ? 'Шығармашылық емтихан' : 'Творческий экзамен',
            short: 'Творч',
            share: ['Творч'],
            icon: creat
        }
    ]
}

