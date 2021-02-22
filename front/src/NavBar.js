import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import {DashboardPage} from "./Dashboard";
import {ArticleApprovalList, ArticleCreateNew, ArticleDetail, ArticleEditedList} from "./Article"
import {Login, Logout, Register} from "./Profile";
import Redirect from "react-router-dom/es/Redirect";


const EditorRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is editor
        // else redirect to homepage
        <Route {...rest} render={props => (
            localStorage.getItem("isEditor") ===true ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

const WriterRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is writer
        // else redirect to homepage
        <Route {...rest} render={props => (
            localStorage.getItem("isEditor") === false ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export function NavBar() {
    return <nav>
        <h3> HolyCodeToy</h3>

        <Router>
            <ul className='nav-links'>
            <Link to='/'>
                <li> Dashboard</li>
            </Link>
            <Link to='/article/new'>
                <li>new article</li>
            </Link>
            <Link to='/article-approval'>
                <li>Article approval list for editor</li>
            </Link>

            <Link to='/article-edited'>
                <li> Show all for editor</li>
            </Link>
            <Link to='/register'>
                <li> Register</li>
            </Link>
            <Link to='/login'>
                <li> Login</li>
            </Link>
            <Link to='/logout'>
                <li> Logut</li>
            </Link>
        </ul>

            <Switch>
                <WriterRoute path="/article/new" exact component={ArticleCreateNew}/>
                <WriterRoute path="/article/:id" component={ArticleDetail}/>

                <EditorRoute path="/article-approval" component={ArticleApprovalList}/>
                <EditorRoute path="/article-edited" component={ArticleEditedList}/>

                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component={Logout}/>

                <Route path="/" component={DashboardPage}/>
            </Switch>


        </Router>
    </nav>
}