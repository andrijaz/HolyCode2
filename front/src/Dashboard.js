import {useEffect, useState} from "react";
import {executeApi} from "./utils";

export function DashboardPage() {
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const resp = executeApi("/blog/article/stats")
        resp.then(data => {
            if (data.status === 200) {

                setStats(data.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (<div>
            <h1>Dashboard</h1>
            {loading ? <p> Loading...</p> :

                <table>
                    <tr>
                        <th> writer</th>
                        <th> total articles</th>
                        <th> last 30 days</th>
                    </tr>
                    {stats.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.total}</td>
                            <td> NaN </td>
                        </tr>
                    })
                    }


                </table>
            }
        </div>
    )
}