"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var globalAPI_1 = require("../asset/globalAPI");
var LeaveApplyMaterialUI = function () {
    var leaveTypes = [
        { name: 'Sick Leave', remainingDays: 10 },
        { name: 'Casual Leave', remainingDays: 5 },
        { name: 'Paid Leave', remainingDays: 15 },
    ];
    var _a = react_1.useState(''), startDate = _a[0], setStartDate = _a[1];
    var _b = react_1.useState(''), endDate = _b[0], setEndDate = _b[1];
    var _c = react_1.useState(''), note = _c[0], setNote = _c[1];
    var _d = react_1.useState(''), leaveCategory = _d[0], setLeaveCategory = _d[1];
    var _e = react_1.useState(''), leaveType = _e[0], setLeaveType = _e[1];
    var _f = react_1.useState(0), age = _f[0], setAge = _f[1]; // State for Age
    react_1.useEffect(function () {
        var getLeave = function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, globalAPI_1.leaveDetails()];
                    case 1:
                        response = _a.sent();
                        if (response.status === 200) {
                            console.log("response data", response.data);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching IP:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        getLeave();
    }, []);
    var handleLeaveFormSubmit = function (e) {
        e.preventDefault();
        var formData = {
            startDate: startDate,
            endDate: endDate,
            note: note,
            leaveCategory: leaveCategory,
            leaveType: leaveType,
            age: age
        };
        console.log('Leave Applied:', formData);
        alert('Leave applied successfully!');
    };
    return (react_1["default"].createElement("div", { style: materialUIStyles.container },
        react_1["default"].createElement("h1", { style: materialUIStyles.header }, "Leave Application"),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h2", { style: materialUIStyles.sectionHeader }, "Leave Balance"),
            react_1["default"].createElement("table", { style: materialUIStyles.table },
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", { style: materialUIStyles.tableHeader }, "Leave Type"),
                        react_1["default"].createElement("th", { style: materialUIStyles.tableHeader }, "Remaining Days"))),
                react_1["default"].createElement("tbody", null, leaveTypes.map(function (leave) { return (react_1["default"].createElement("tr", { key: leave.name },
                    react_1["default"].createElement("td", { style: materialUIStyles.tableCell }, leave.name),
                    react_1["default"].createElement("td", { style: materialUIStyles.tableCell }, leave.remainingDays))); })))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h2", { style: materialUIStyles.sectionHeader }, "Apply for Leave"),
            react_1["default"].createElement("form", { onSubmit: handleLeaveFormSubmit, style: materialUIStyles.form },
                react_1["default"].createElement("div", { style: materialUIStyles.formField },
                    react_1["default"].createElement("label", null, "Leave Type:"),
                    react_1["default"].createElement("select", { value: leaveType, onChange: function (e) { return setLeaveType(e.target.value); }, required: true, style: materialUIStyles.input },
                        react_1["default"].createElement("option", { value: "" }, "Select Leave Type"),
                        react_1["default"].createElement("option", { value: "Sick Leave" }, "Sick Leave"),
                        react_1["default"].createElement("option", { value: "Casual Leave" }, "Casual Leave"),
                        react_1["default"].createElement("option", { value: "Paid Leave" }, "Paid Leave"))),
                react_1["default"].createElement("div", { style: materialUIStyles.formField },
                    react_1["default"].createElement("label", null, "Start Date:"),
                    react_1["default"].createElement("input", { type: "date", value: startDate, onChange: function (e) { return setStartDate(e.target.value); }, required: true, style: materialUIStyles.input })),
                react_1["default"].createElement("div", { style: materialUIStyles.formField },
                    react_1["default"].createElement("label", null, "End Date:"),
                    react_1["default"].createElement("input", { type: "date", value: endDate, onChange: function (e) { return setEndDate(e.target.value); }, required: true, style: materialUIStyles.input })),
                react_1["default"].createElement("div", { style: materialUIStyles.formField },
                    react_1["default"].createElement("label", null, "Leave Category:"),
                    react_1["default"].createElement("select", { value: leaveCategory, onChange: function (e) { return setLeaveCategory(e.target.value); }, required: true, style: materialUIStyles.input },
                        react_1["default"].createElement("option", { value: "" }, "Select Leave Category"),
                        react_1["default"].createElement("option", { value: "Medical" }, "Medical"),
                        react_1["default"].createElement("option", { value: "Personal" }, "Personal"),
                        react_1["default"].createElement("option", { value: "Holiday" }, "Holiday"))),
                react_1["default"].createElement("div", { style: materialUIStyles.formField },
                    react_1["default"].createElement("label", null, "Age:"),
                    react_1["default"].createElement("input", { type: "number", value: age, onChange: function (e) { return setAge(Number(e.target.value)); }, required: true, style: materialUIStyles.input, placeholder: "Enter your age" })),
                react_1["default"].createElement("div", { style: materialUIStyles.formField },
                    react_1["default"].createElement("label", null, "Note:"),
                    react_1["default"].createElement("textarea", { value: note, onChange: function (e) { return setNote(e.target.value); }, style: materialUIStyles.textarea })),
                react_1["default"].createElement("button", { type: "submit", style: materialUIStyles.button }, "Apply Leave")))));
};
var materialUIStyles = {
    container: {
        fontFamily: 'Roboto, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        maxWidth: '100vw',
        margin: '0 auto',
        borderRadius: '10px'
    },
    header: {
        fontSize: '2.2em',
        fontWeight: '500',
        textAlign: 'center',
        color: '#1976d2'
    },
    sectionHeader: {
        fontSize: '1.4em',
        fontWeight: '400',
        marginBottom: '15px',
        color: '#333'
    },
    table: {
        width: '100%',
        marginBottom: '20px'
    },
    tableHeader: {
        padding: '12px',
        backgroundColor: '#1976d2',
        color: 'white',
        fontSize: '1em'
    },
    tableCell: {
        padding: '12px',
        borderBottom: '1px solid #ddd'
    },
    form: {
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
    },
    formField: {
        marginBottom: '15px'
    },
    input: {
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        width: '100%'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        height: '100px'
    },
    button: {
        padding: '12px 30px',
        backgroundColor: '#1976d2',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        width: '100%',
        cursor: 'pointer',
        fontSize: '1em'
    }
};
exports["default"] = LeaveApplyMaterialUI;
