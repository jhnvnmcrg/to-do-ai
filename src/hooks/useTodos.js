"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useToggleTodo = exports.useDeleteTodo = exports.useUpdateTodo = exports.useCreateTodo = exports.useTodos = void 0;
var react_query_1 = require("@tanstack/react-query");
var todo_service_1 = require("../server/todo.service");
function useTodos() {
    return (0, react_query_1.useQuery)({
        queryKey: ['todos'],
        queryFn: todo_service_1.getTodos
    });
}
exports.useTodos = useTodos;
function useCreateTodo() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: todo_service_1.createTodo,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}
exports.useCreateTodo = useCreateTodo;
function useUpdateTodo() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var id = _a.id, updates = _a.updates;
            return (0, todo_service_1.updateTodo)(id, updates);
        },
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}
exports.useUpdateTodo = useUpdateTodo;
function useDeleteTodo() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: todo_service_1.deleteTodo,
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}
exports.useDeleteTodo = useDeleteTodo;
function useToggleTodo() {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: function (_a) {
            var id = _a.id, completed = _a.completed;
            return (0, todo_service_1.toggleTodo)(id, completed);
        },
        onSuccess: function () {
            queryClient.invalidateQueries({
                queryKey: ['todos']
            });
        }
    });
}
exports.useToggleTodo = useToggleTodo;
