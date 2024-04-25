/**
 * @jest-environment jsdom
 */

import {Button} from "./Button.tsx";
import {fireEvent, render} from "@testing-library/react";

test('Button text applies', () => {
    const instance = render(<Button onClick={() => {}}>Hello</Button>);

    // Check that button with "Hello" text exists
    expect(instance.getByText("Hello")).toBeDefined();
})

test('Has press handler', () => {
    let x = 0;
    const instance = render(<Button onClick={() => x++}>Hello</Button>);

    // Check that click handler work
    expect(x).toBe(0);
    fireEvent.click(instance.getByText("Hello"));
    expect(x).toBe(1);
})
