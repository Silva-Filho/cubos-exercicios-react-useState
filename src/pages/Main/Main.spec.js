import React from "react";

import { render, screen, userEvent } from "../../tests";

import { Main } from "./index";

// @ts-ignore
/* const user = userEvent.setup();
await user.keyboard("[Enter]");
await user.click(inputAddTodo); */

describe( "page Main", () => {
    it( "should display list - with getByRole", () => {
        render( <Main /> );

        expect( screen.getByRole( "list" ) ).toBeInTheDocument();
    } );

    it( "should not display any listitem - with queryByRole", () => {
        render( <Main /> );

        expect( screen.queryByRole( "listitem" ) ).not.toBeInTheDocument();
    } );

    it( "should have an input - with queryByRole", () => {
        render( <Main /> );

        const inputAddTodo = screen.queryByRole( "textbox" );

        expect( inputAddTodo ).toBeInTheDocument();
    } );

    it( "should add new todo value at input", () => {
        render( <Main /> );

        const inputTextTest = "Teste adicionar nova tarefa";
        
        const inputAddTodo = screen.getByLabelText( /add-todo/i );

        userEvent.click( inputAddTodo );
        // @ts-ignore
        inputAddTodo.value = inputTextTest;

        // @ts-ignore
        expect( inputAddTodo.value ).toBe( inputTextTest );
    } );

    it( "should input have value empty after Enter click", async () => {
        render( <Main /> );

        const inputTextTest = "Teste adicionar nova tarefa";
        
        const inputAddTodo = screen.getByLabelText( /add-todo/i );

        userEvent.click( inputAddTodo );
        // @ts-ignore
        inputAddTodo.value = inputTextTest;
        userEvent.keyboard( "[Enter]" );

        expect( inputAddTodo ).toHaveValue( "" );
    } );

    it( "should not display a todo with only spaces", () => {
        render( <Main /> );

        const inputTextTest = "       ";
        
        const inputAddTodo = screen.getByLabelText( /add-todo/i );

        userEvent.type( inputAddTodo, inputTextTest );
        userEvent.keyboard( "[Enter]" );

        const todoItem = screen.queryByText( inputTextTest );

        // @ts-ignore
        expect( todoItem ).not.toBeInTheDocument();
    } );

    it( "should display a todo list", async () => {
        render( <Main /> );

        const inputAddTodo = await screen.findByRole( "textbox" );

        await userEvent.type( inputAddTodo, "Estudar SCSS." );
        userEvent.keyboard( "[Enter]" );

        await userEvent.type( inputAddTodo, "Estudar Angular." );
        userEvent.keyboard( "[Enter]" );

        const todoItem = screen.queryByText( /estudar angular/i );

        // expect( todoItem ).toHaveTextContent( "Estudar Angular." );
        expect( todoItem ).toBeInTheDocument();
    } );

    it( "should not display a todo list", () => {
        render( <Main /> );

        const inputAddTodo = screen.getByRole( "textbox" );

        userEvent.type( inputAddTodo, "Estudar SCSS." );
        userEvent.keyboard( "[Enter]" );

        const todoItem = screen.queryByText( /estudar angular/i );

        expect( todoItem ).not.toBeInTheDocument();
    } );

    it( "should task not has class 'task-done' if not done", async () => {
        render( <Main /> );

        const inputAddTodo = screen.getByRole( "textbox" );

        userEvent.click( inputAddTodo );
        userEvent.keyboard( "Teste adicionar nova tarefa" );
        userEvent.keyboard( "[Enter]" );

        const todoDone = screen.queryByText( /teste adicionar nova tarefa/i );

        /* expect( todoDone ).not.toHaveAttribute(
            "class",
            "task-done"
        ); */
        expect( todoDone ).not.toHaveClass( "task-done" );
    } );

    it( "should mark task as done", async () => {
        render( <Main /> );

        const inputAddTodo = screen.getByRole( "textbox" );

        userEvent.click( inputAddTodo );
        userEvent.keyboard( "Teste adicionar nova tarefa" );
        userEvent.keyboard( "[Enter]" );

        const todoDone = screen.getByText( /teste adicionar nova tarefa/i );

        await userEvent.click( todoDone );

        /* expect( todoDone ).toHaveAttribute(
            "class",
            "task-done"
        ); */
        expect( todoDone ).toHaveClass( "task-done" );
    } );

    it( "should delete task when click X", () => {
        render( <Main /> );

        const inputAddTodo = screen.getByRole( "textbox" );

        userEvent.type( inputAddTodo, "Estudar SCSS." );
        userEvent.keyboard( "[Enter]" );

        userEvent.type( inputAddTodo, "Estudar Angular." );
        userEvent.keyboard( "[Enter]" );
        
        const buttonToDeleteTodo = screen.getByTestId( 1 ).lastElementChild;
        // @ts-ignore
        userEvent.click( buttonToDeleteTodo );

        const todoToDelete = screen.queryByTestId( 1 );

        expect( todoToDelete ).not.toBeInTheDocument();
    } );
} );
