import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from './todo/page'
import MainPage from './page'


describe('Набор тестов для главной страницы <MainPage/>', ()=>{

  test('В MainPage есть элемент содержащий слово "страница" ', ()=>{
    render(<MainPage/>)
    const el =  screen.getByText(/страница/i)
    expect(el).toBeInTheDocument()
  })
  
  test('В MainPage есть элемент содержащий слово "перейти"', ()=>{
    render(<MainPage/>)
    const el =  screen.getByText(/перейти/i)
    expect(el).toBeInTheDocument()
  })

  test('В MainPage есть элемент содержащий слово "активные"', ()=>{
    render(<MainPage/>)
    const el =  screen.queryByText(/активные/i)
    expect(el).not.toBeInTheDocument()
  })
})


describe('Набор тестов для страницы todo компонента <TodoList/>', ()=>{

  test('Кнопка с надписью активные существует и не имеет стиля выбранного фильтра по умолчанию', async()=>{
    render(<TodoList/>)
    const el = await screen.findByText(/активные/i)
    expect(el).toBeInTheDocument()
    expect(el).not.toHaveClass('activeFilterBtn')
  })

  test('Кнопка с надписью все существует и иммет стиль выбранного фильтра по умолчанию', ()=>{
    render(<TodoList/>)
    const el = screen.getByText(/все/i)
    expect(el).toBeInTheDocument()
    expect(el).toHaveClass('activeFilterBtn')
  })

  test('Кнопка с надписью Выполненые существует и не имеет стиля выбранного фильтра по умолчанию', ()=>{
    render(<TodoList/>)
    const el = screen.getByText(/Выполненые/i)
    expect(el).toBeInTheDocument()
    expect(el).not.toHaveClass('activeFilterBtn')
  })

  test('Кнопка с надписью Выполненые существует и после клика на нее имеет стиль выбранного фильтра по умолчанию. Cтиль активной кнопки для других кнопок деактивируется', async()=>{
    render(<TodoList/>)
    const btnCompleted = await screen.findByText(/Выполненые/i)
    expect(btnCompleted).toBeInTheDocument()
    expect(btnCompleted).not.toHaveClass('activeFilterBtn')

    const btnAll = await screen.findByText(/все/i)
    expect(btnAll).toHaveClass('activeFilterBtn')

    fireEvent.click(btnCompleted)
    expect(screen.queryByText(/Выполненые/i)).toHaveClass('activeFilterBtn')
    expect(screen.queryByText(/все/i)).not.toHaveClass('activeFilterBtn')
  })

  test('Поиск по плейсхолдеру заголовок должна сущестствовать на странице', ()=>{
    render(<TodoList/>)
    const el = screen.getByPlaceholderText(/заголовок/i)
    expect(el).toBeInTheDocument()
  })

  test('Поиск по плейсхолдеру описание должна существовать на странице', ()=>{
    render(<TodoList/>)
    const el = screen.getByPlaceholderText(/описание/i)
    expect(el).toBeInTheDocument()
  })

  test('Должно быть 2 инпута содержащих плейсхолдер введите', ()=>{
    render(<TodoList/>)
    const els = screen.getAllByPlaceholderText(/введите/i)
    expect(els.length).toBe(2)
  })

  test('Проверка ввода в инпут', ()=>{

    const inputTypeValue = 'hello world'

    render(<TodoList/>)
    const input = screen.getByPlaceholderText(/заголовок/i)
    expect(input).toContainHTML('')

    fireEvent.input(input, {
      target: {value: inputTypeValue}
    })

    expect(screen.getByPlaceholderText(/заголовок/i)).toContainHTML(inputTypeValue)
  })
})