const Intern = require("../lib/Intern");

test("Creates intern object", () => {
    const testValue = "uofr";
    const e = new Intern("randy", "randyfaison@gmail.com", "rwf", "uofr");

    expect(e.school).toBe(testValue);
});

test("getRole() returns the role", () => {
    const intern = new Intern("randy","randyfaison@gmail.com","rwf","uofr");
    expect(intern.getRole()).toBe("Intern");
});

test("getSchool() returns the school", () => {
    const intern = new Intern("randy","randyfaison@gmail.com","rwf","uofr");
    expect(intern.getSchool()).toBe("uofr");
})
