import { Button, message } from "antd";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { destroyCookie } from "nookies";


const error = (statusText: any) => {
  message.error(`Error: ${statusText}`);
}

const Restaraunts = ({ restaraunts }: { restaraunts: Restaraunts }) => {
  const router = useRouter();

  const jwt = parseCookies().jwt;

  const handleClick = () => {
    destroyCookie(null, "jwt");
  }

  const deleteItem = (id: any) => {
    axios.delete(`http://localhost:1337/api/restaraunts/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then(() => {
        router.push("/restaraunts")
      })
      .catch(err => {
        console.log(err.response);

        const statusText = err.response.data.error.message;
        error(statusText);
      })
  }

  const data = restaraunts.data;

  return <div>
    <ul>
      {data.map(({ id, attributes }) => {
        return (
          <div key={id}>
            <h4>Restaraunt N#{id}</h4>
            <h1>{attributes.name}</h1>
            <p>{attributes.description}</p>
            <Button
              style={{ background: "red", color: "#fff" }}
              onClick={() => deleteItem(id)}>Delete
            </Button>
            <Button
              style={{ background: "green", color: "#fff" }}
            >Edit
            </Button>
            <hr></hr>
          </div>
        )
      })}
    </ul>
    <Button href="/">Home Page</Button>

    <Button href="/restaraunts/add">Add new Restaraunt</Button>

    <Button href="/login" onClick={handleClick}>Log out</Button>
  </div>
}

export async function getServerSideProps(ctx: any) {

  const jwt = await parseCookies(ctx).jwt;

  console.log(jwt);


  const res = await axios.get('http://localhost:1337/api/restaraunts', {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  });
  const restaraunts = await res.data;

  return {
    props: {
      restaraunts
    },
  }
}



export interface Restaraunts {
  data: Array<DataInt>,
  meta: Object
}

export interface DataInt {
  id: any,
  attributes: Attributes
}

export interface Attributes {
  name: String,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  publishedAt: Date
}

export default Restaraunts;
