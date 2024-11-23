import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Bigbox from '../components/Bigbox'
import { getAirdropbyid } from '../api'

function AirdropDetails() {
    const { id } = useParams()
    const [airdrop, setAirdrop] = useState(null)
    const [loading, setLoading] = useState(true)  // Track loading state
    const [error, setError] = useState(null)      // Track error state

    const fetchAirdrop = async () => {
        setLoading(true)
        setError(null)
        try {
            const result = await getAirdropbyid(id)
            console.log("Fetched result:", result)
            setAirdrop(result)
        } catch (error) {
            setError(error.message)
            console.error("Error fetching airdrop:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAirdrop()
    }, [id])

    // Handle different states: loading, error, or content display
    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!airdrop) {
        return <div>No airdrop data available.</div>
    }

    console.log("Airdrop data:", airdrop.data)

    return (
        <div className='flex flex-col w-full h-[100%]'>
            <Bigbox airdrop={airdrop} />
            
        </div>
    )
}

export default AirdropDetails
