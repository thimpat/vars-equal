/**
 * To generate tests for ESM:
 * $> npm run build:test
 */
const {expect} = require("chai");
const {describe, it} = require("mocha");


/** to-esm-esm: remove **/
const {varsEqual} = require("../cjs/index.cjs");
/** to-esm-esm: end-remove **/

/** to-esm-esm: add
 import {varsEqual} from "../esm/index.mjs";
 **/


describe("On cjs/index.cjs", () =>
{
    it("should work", function ()
    {
        const result = true;
        expect(result).to.equal(true);
    });

    describe("the function varsEqual", () =>
    {
        // ----------------------
        // Truthies and Falsies
        // ----------------------
        it("should be true when the two arguments are both null", function ()
        {
            const result = varsEqual(null, null);
            expect(result).to.be.true;
        });

        it("should be true when the two arguments are both undefined", function ()
        {
            const result = varsEqual(null, null);
            expect(result).to.be.true;
        });

        it("should be true when the two arguments are both false", function ()
        {
            const result = varsEqual(false, false);
            expect(result).to.be.true;
        });

        it("should be true when the two arguments are both true", function ()
        {
            const result = varsEqual(true, true);
            expect(result).to.be.true;
        });

        it("should be false when one argument is undefined and the other null", function ()
        {
            const result = varsEqual(null, undefined);
            expect(result).to.be.false;
        });

        it("should be false when one argument is undefined and the other false", function ()
        {
            const result = varsEqual(null, undefined);
            expect(result).to.be.false;
        });

        it("should be false when one argument is null and the other false", function ()
        {
            const result = varsEqual(null, undefined);
            expect(result).to.be.false;
        });

        // ----------------------
        // Integers
        // ----------------------
        it("should be true when when the two arguments are both 0", function ()
        {
            const result = varsEqual(0, 0);
            expect(result).to.be.true;
        });

        it("should be true when when the two arguments are two same integers", function ()
        {
            const result = varsEqual(456, 456);
            expect(result).to.be.true;
        });

        it("should be true when when the two arguments are two same integers with opposite sign", function ()
        {
            const result = varsEqual(456, -456);
            expect(result).to.be.false;
        });

        it("should be false when arguments are two different integers", function ()
        {
            const result = varsEqual(556, 58);
            expect(result).to.be.false;
        });


        // ----------------------
        // String
        // ----------------------
        it("should be false when arguments are the same string", function ()
        {
            const result = varsEqual("aaaaa", "aaaaa");
            expect(result).to.be.true;
        });

        it("should be false when arguments are two different string", function ()
        {
            const result = varsEqual("aaaaa", "bbbbb");
            expect(result).to.be.false;
        });

        // ----------------------
        // Arrays
        // ----------------------
        it("should be true when arguments are the same array", function ()
        {
            const result = varsEqual([1, 2, 3, "ewe", "dfdf"], [1, 2, 3, "ewe", "dfdf"]);
            expect(result).to.be.true;
        });

        it("should be false when arguments are two arrays with different order", function ()
        {
            const result = varsEqual([1, 2, 3], [1, 3, 2]);
            expect(result).to.be.false;
        });

        it("should be false when arguments are two different arrays", function ()
        {
            const result = varsEqual([1, 2, 3, "ewe", "dfdf"], [1, 2, 3, "ewe", 0]);
            expect(result).to.be.false;
        });

        // ----------------------
        // Non primitive entities
        // ----------------------
        it("should be true when arguments are the same Date object", function ()
        {
            const date = new Date();
            const result = varsEqual(date, date);
            expect(result).to.be.true;
        });

        it("should be false when arguments are two different dates", function ()
        {
            const date1 = new Date();
            const date2 = new Date("10/23/2015");
            const result = varsEqual(date1, date2);
            expect(result).to.be.false;
        });

        it("should be true when arguments are the same function", function ()
        {
            const f1 = () =>
            {
            };
            const result = varsEqual(f1, f1);
            expect(result).to.be.true;
        });

        it("should be true when arguments are functions implemented the same way", function ()
        {
            const f1 = () =>
            {
            };
            const f2 = () =>
            {
            };
            const result = varsEqual(f1, f2);
            expect(result).to.be.true;
        });

        it("should be false when arguments are two different functions", function ()
        {
            const f1 = () =>
            {
            };
            const f2 = () =>
            {
                return 2;
            };
            const result = varsEqual(f1, f2);
            expect(result).to.be.false;
        });

        it("should be false when one argument is a function and the string value of its implementation", function ()
        {
            const f1 = () =>
            {
            };
            const str = "() => {}";
            const result = varsEqual(f1, str);
            expect(result).to.be.false;
        });

        it("should be false when arguments are two different functions", function ()
        {
            const s1 = Symbol(1);
            const s2 = Symbol(1);
            const result = varsEqual(s1, s2);
            expect(result).to.be.false;
        });

        // ----------------------
        // Objects
        // ----------------------
        it("should be true when arguments are the same object", function ()
        {
            const result = varsEqual({ff: 6, ee: 5, dd: 4, cc: 3, bb: 2, aa: 1}, {
                ff: 6,
                ee: 5,
                dd: 4,
                cc: 3,
                bb: 2,
                aa: 1
            });
            expect(result).to.be.true;
        });

        it("should be true when arguments are the same object, but with different order of keys", function ()
        {
            const result = varsEqual({ff: 6, ee: 5, dd: 4, cc: 3, bb: 2, aa: 1}, {
                aa: 1,
                bb: 2,
                dd: 4,
                cc: 3,
                ee: 5,
                ff: 6
            });
            expect(result).to.be.true;
        });

        it("should be false when arguments are two different objects", function ()
        {
            const result = varsEqual({ff: 6, ee: 5, dd: 4, cc: 4, bb: 4, aa: 1}, {
                ff: 6,
                ee: 5,
                dd: 4,
                cc: 3,
                bb: 2,
                aa: 1
            });
            expect(result).to.be.false;
        });

        it("should be false when arguments are two different objects with one with a different key", function ()
        {
            const result = varsEqual({ff: 6, ee: 5, dd: 4, cc: 3, bb: 2, aa: 1}, {
                gg: 6,
                ee: 5,
                dd: 4,
                cc: 3,
                bb: 2,
                aa: 1
            });
            expect(result).to.be.false;
        });

        it("should be false when arguments are two different objects with one missing a key", function ()
        {
            const result = varsEqual({ff: 6, ee: 5, dd: 4, cc: 3, bb: 2, aa: 1}, {ff: 6, ee: 5, cc: 3, bb: 2, aa: 1});
            expect(result).to.be.false;
        });

        // ----------------------
        // Array of objects
        // ----------------------
        it("should keep equivalency even if the structure may change", function ()
        {
            const obj1 = {
                "users": {
                    "admin": {
                        "password": "hgfhff"
                    }
                },
                "earnings": [
                    "\\?p=(.*)"
                ],
                "ignore": [
                    "automator.tests"
                ],
                "modulename": "web-analyst@latest",
                "name": "web-analyst",
                "pages": [
                    ".*\\.html\\b",
                    "\\/$"
                ],
                "token": "fhfghgf"
            };
            const obj2 = {
                "description": "Link to the web-analyst folder at C:/projects/web-analyst",
                "users": {
                    "admin": {
                        "password": "admin"
                    }
                },
                "earnings": [
                    "\\?p=(.*)"
                ],
                "ignore": [
                    "automator.tests"
                ],
                "modulelink": "C:/projects/web-analyst",
                "name": "web-analyst",
                "pages": [
                    ".*\\.html\\b",
                    "\\/$"
                ],
                "token": "dfgdffgd"
            };

            const clone = Object.assign({}, obj1);
            varsEqual(obj1, obj2);

            const equals = varsEqual(obj1, clone);
            expect(equals).be.true;
        });

        it("should be true when both arguments are the same", function ()
        {
            const obj1 = {
                "users": {
                    "admin": {
                        "password": "hgfhff"
                    }
                },
                "earnings": [
                    "\\?p=(.*)"
                ],
                "ignore": [
                    "automator.tests"
                ],
                "modulename": "web-analyst@latest",
                "name": "web-analyst",
                "pages": [
                    ".*\\.html\\b",
                    "\\/$"
                ],
                "token": "fhfghgf"
            };
            const equals = varsEqual(obj1, obj1);
            expect(equals).to.be.true;
        });

        it("should be false when the array of objects are different", function ()
        {
            const obj1 = {
                "users": {
                    "admin": {
                        "password": "hgfhff"
                    }
                },
                "earnings": [
                    "\\?p=(.*)"
                ],
                "ignore": [
                    "jjhjhm,b,"
                ],
                "modulename": ",..,,.,.",
                "name": "yttyyut",
                "pages": [
                    ".*\\.html\\b",
                    "\\/$"
                ],
                "token": "fhfghgf"
            };
            const obj2 = {
                "description": "bbmhmhgmgh",
                "users": {
                    "admin": {
                        "password": "fdfdfdd"
                    }
                },
                "earnings": [
                    "\\?p=(.*)"
                ],
                "ignore": [
                    "kiijuojlkljjk"
                ],
                "modulelink": "assaaasasf",
                "name": "hgjgfhffghf",
                "pages": [
                    ".*\\.html\\b",
                    "\\/$"
                ],
                "token": "dfgdffgd"
            };
            const equals = varsEqual(obj1, obj2);
            expect(equals).to.be.false;
        });

        // ----------------------
        // Complex nested
        // ----------------------
        it("should be true when arguments are the same two complex nested object with depth === 1", function ()
        {
            const result = varsEqual(
                {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
                {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
            );
            expect(result).to.be.true;
        });

        it("should be false when arguments are different two complex nested object with depth === 1", function ()
        {
            const result = varsEqual(
                {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
                {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "a", "dfdf"], bb: 2, aa: 1},
            );
            expect(result).to.be.false;
        });

        it("should be true when arguments are the same two complex nested array", function ()
        {
            const result = varsEqual(
                [
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}
                ],
                [
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}
                ],
            );
            expect(result).to.be.true;
        });

        it("should be false when arguments are different complex nested arrays", function ()
        {
            const result = varsEqual(
                [
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}
                ],
                [
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1},
                    {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 5, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}
                ],
            );
            expect(result).to.be.false;
        });

        it("should be true when arguments are the same two complex nested object with depth > 1", function ()
        {
            const result = varsEqual(
                {
                    ff                                               : 6, ee: [
                        1, 2, 3, "ewe",
                        [
                            {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}, {
                            ff                                            : 6, ee                                     : [1, 2, 3, "ewe", "dfdf"],
                            dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                        }
                        ]
                    ], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                },
                {
                    ff                                               : 6, ee: [
                        1, 2, 3, "ewe",
                        [
                            {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}, {
                            ff                                            : 6, ee: [1, 2, 3, "ewe", "dfdf"],
                            dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                        }
                        ]
                    ], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                },
            );
            expect(result).to.be.true;
        });

        it("should be false when arguments are different two complex nested object with depth > 1", function ()
        {
            const result = varsEqual(
                {
                    ff                                               : 6, ee                                        : [
                        1, 2, 3, "ewe",
                        [
                            {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}, {
                            ff                                            : 6, ee: [1, 2, 3, "ewe", "dfdf"],
                            dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                        }
                        ]
                    ], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                },
                {
                    ff                                               : 6, ee: [
                        1, 2, 3, "ewe",
                        [
                            {ff: 6, ee: [1, 2, 3, "ewe", "dfdf"], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1}, {
                            ff                                     : 6, ee                              : [1, 2, 3, "ewe", "dfdf"],
                            dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2
                        }
                        ]
                    ], dd: 4, cc: [1, 2, 3, "ewe", "dfdf"], bb: 2, aa: 1
                },
            );
            expect(result).to.be.false;
        });


    });

});