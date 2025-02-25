import { Button, Table, TableColumnsType } from 'antd'

import { useDeleteBookingMutation, useGetMyBookingQuery } from '../../redux/features/booking/booking.api'
import toast from 'react-hot-toast'
import { TBooking } from '../../types/booking.type'
import Loading from '../../components/Loading'

function BookingManagement() {
    const { data: bookingData, isLoading } = useGetMyBookingQuery(undefined)

    const [updateBooking] = useDeleteBookingMutation()
    // const cancleDataConform = bookingData?.data.map((i: TBooking) => {
    //     return i.status === 'confirmed' ? true : false
    // })
    if (isLoading) {
        return <Loading />
    }
    console.log(bookingData?.data.status, "bookingData")
    const tableData = bookingData?.data?.map(({ _id, user, customerDetails, status, car, date, startTime, endTime, costWithFeature }: TBooking) => ({
        key: _id,
        userName: customerDetails?.name,
        userEmail: customerDetails?.email,
        carname: car?.name,
        date,
        startTime,
        endTime,
        costWithFeature,
        user,
        status
    }))
    console.log(tableData)

    const handleCancle = async (id: string) => {

        const updateData = {
            id
        }
        try {
            const res = await updateBooking(updateData)
            console.log(res)
            toast.success('booking deleted successfull')
        } catch (error) {
            toast.error('something went wrong')
        }
    }

    const columns: TableColumnsType<TBooking> = [
        {
            title: 'Name',
            dataIndex: 'userName',
            showSorterTooltip: { target: 'full-header' },

        },
        {
            title: 'email',
            dataIndex: 'userEmail',
        },
        {
            title: 'Total Cost',
            dataIndex: 'costWithFeature',
        },
        {
            title: 'Car Name',
            dataIndex: 'carname',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            render: (item) => {
                return (
                    <div className='flex gap-2'>
                        <Button disabled={item.status === 'confirmed' ? true : false} onClick={() => handleCancle(item.key)}>Cancle</Button>
                    </div>
                )
            }
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
        </div>
    )
}

export default BookingManagement