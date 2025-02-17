import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../../../components/LoadingBox.tsx";
import MessageBox from "../../../components/MessageBox.tsx";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../../hooks/userHooks.ts";
import { ApiError } from "../../../types/ApiError.ts";
import { getError } from "../../../util.ts";

export default function UserEditPage() {
    const params = useParams()
    const { id: userId } = params
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, error } = useGetUserDetailsQuery(userId!)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

const { mutateAsync: updateUser, isPending: loadingUpdate } =
        useUpdateUserMutation()

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            await updateUser({
                _id: userId!,
                name,
                email,
                isAdmin,
            })
            toast.success('User updated successfully')
            navigate('/admin/users')
        } catch (err) {
            toast.error(getError(err as unknown as ApiError))
        }
    }

    return (
        <Container className="small-container">
            <Helmet>
                <title>Edit User ${userId}</title>
            </Helmet>
            <h1>Edit User {userId}</h1>

            {isLoading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{getError(error as unknown as ApiError)}</MessageBox>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Check
                        className="mb-3"
                        type="checkbox"
                        id="isAdmin"
                        label="isAdmin"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />

                    <div className="mb-3">
                        <Button disabled={loadingUpdate} type="submit">
                            Update
                        </Button>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                    </div>
                </Form>
            )}
        </Container>
    )
}
