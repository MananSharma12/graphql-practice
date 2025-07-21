import './App.css'
import {useQuery, gql} from "@apollo/client";

const GET_ALL_USERS = gql`
    query GetTodosWithUser {
        getTodos {
            id
            title
            completed
            user {
                name
            }
        }
    }
`;

function App() {
    const {loading, data} = useQuery(GET_ALL_USERS);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <table>
                <tbody>
                {data.getTodos.map(todo => (
                    <tr>
                        <td>{todo.title}</td>
                        <td>{todo.user.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default App
