import {useEffect, useState} from "react";
import {executeApi} from "./utils";

export function ArticleDetail(props) {

    const [loading, setLoading] = useState(true)
    const [article, setArticle] = useState(null)
    useEffect(() => {
        const resp = executeApi("/blog/article/" + props.match.params.id)
        resp.then(data => {
            if (data.status === 200) {
                setArticle(data.data)
                setLoading(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            {loading ?
                <p>loading</p> : <div>
                    <p>{article.created_at}</p>
                    <p>{article.title}</p>
                    <p>{article.content}</p>
                    <p>{article.status}</p>
                    <p>{article.writen_by}</p>
                    <p>{article.edited_by}</p>
                </div>
            }
        </div>
    )
}

export function ArticleSmall({article}) {
    function handleApprove(value) {
        const status = value===true? "Approved": "Rejected"
        console.log(value, article.id)
        const data = {
            status: status,
            content: article.content,
            written_by: article.written_by,
            edited_by: localStorage.getItem("username")
        }
        const resp = executeApi("/blog/article/" + article.id, "PATCH", data)
        resp.then(data => {
            if (data.status === 200) {
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <p> {article.title}</p>
            <button onClick={() => handleApprove(true)}>Approve</button>
            <button onClick={() => handleApprove(false)}>Reject</button>
        </div>
    )

}

export function ArticleCreateNew() {
    function handleSubmit(event) {
        event.preventDefault()
        const formData = {
            title: event.target.title.value,
            content: event.target.content.value,
            written_by: localStorage.getItem("username"),
            edited_by: null,
            status: "Pending",
        }
        console.log(formData)

        const resp = executeApi("/blog/article", "POST", formData)
        resp.then(data => {
            if (data.status === 201) {
                console.log("OK")
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title" required name="title"/>
                <input type="text" placeholder="content" required name="content"/>
                <button type="submit"> Create</button>
            </form>
        </div>
    )
}

export function ArticleApprovalList() {
    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState([])
    useEffect(() => {
        const resp = executeApi("/blog/article",)
        resp.then(data => {
            if (data.status === 200) {
                const articlestoshow = data.data.results.filter(item=> item.status !== "Pending")
                setArticles(articlestoshow)
                setLoading(false)

            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div>
            {loading ?
                <p>loading ...</p> :
                articles.map((item, index) => {
                    return <ArticleSmall article={item}/>
                })

            }


        </div>
    )
}

export function ArticleEditedList() {
    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState([])
    useEffect(() => {
        const resp = executeApi("/blog/article?status=Approved",)
        resp.then(data => {
            if (data.status === 200) {
                setArticles(data.data.results)
                setLoading(false)

            }
        }).catch(err => {
            console.log(err)
        })


    }, [])
    return (
        <div>
            {loading ?
                <p>loading ...</p> :
                articles.map((item, index) => {
                    return <p> {item.title} - {item.status}</p>
                })

            }


        </div>
    )
}