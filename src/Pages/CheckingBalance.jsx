import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import { Link } from "react-router-dom"
import InputAndInfo from "../Components/InputAndInfo"
import CheckingOrSaving from "../Components/CheckingOrSaving"
import SendBetweenAccounts from "../Components/SendBetweenAccounts"

function CheckingBalance() {

    const {
        userLoggedData,
        depositChecking,
        withdrawChecking,
        handleDepositChecking,
        depositToChecking,
        handleWithdrawChecking,
        withdrawFromChecking,
        handleSendToSaving,
        sendingToSaving,
        sendToSaving,
        logOut,
    } = useContext(UserContext)

    let navigate = useNavigate()

    const backHome = () => {
        console.log("back home")
        logOut()
        navigate("/")
    }


    // filter checking transactions only (and reverse the order chronologically)
    const dataAsArray = Object.entries(userLoggedData)
    let checkingTransactionsHistoryArray = (dataAsArray.filter(i => (i[1][0] === "transaction-checking" || i[1][0] === "transaction-ToSaving" || i[1][0] === "transaction-ToChecking"))).reverse()

    let checkingTransactionsHistory = checkingTransactionsHistoryArray.map(transaction => {
        // fix date
        let transactionDate = (transaction[0]).substring(4,15)
        let transactionHour = (transaction[0]).substring(16,21)

        return (
            <div key={transaction[0]} className="w-full border-b-2 border-slate-600 py-4">
                <div className="flex justify-between">
                    <p className="font-light text-sm">{transactionDate}</p>
                    <p className="font-light text-sm">{transactionHour}</p>
                </div>
                <div className="flex justify-between">
                    <h2 className="font-semibold">{transaction[1][1]}</h2>
                    <h2 className="font-semibold">{transaction[1][2]}{userLoggedData.currency}</h2>
                </div>
            </div>
        )
    })


    return (
        <>
            <div className="flex items-center justify-center">
                <div className="md:w-1/3 w-full">
                    <Link to="/">
                        <img className="object-contain mx-auto w-1/12 my-4" src="src/assets/ledger-logo.svg" />
                    </Link>
                    <h2 className="capitalize text-4xl text-center">Hello {userLoggedData.username}</h2>

                    <CheckingOrSaving selected={"CHECKING"} />

                    <div className="pt-4 pb-8">
                        <h1 className="capitalize text-6xl text-center">{userLoggedData.checkingBalance}{userLoggedData.currency}</h1>
                    </div>

                    <div className="relative h-8 border-t-2 border-white border-solid">
                        <div className="absolute -top-[1.3em] inset-x-1/4 bg-white text-black p-2 rounded-full w-3/6 mx-auto">
                            <h3 className="uppercase text-base text-center">TOTAL BALANCE</h3>
                        </div>
                    </div>

                    <div className="flex justify-between my-4">

                        <InputAndInfo
                            currency={userLoggedData.currency}
                            buttonCopy= "DEPOSIT"
                            valueAmount={depositChecking.amount}
                            valueInfo={depositChecking.info}
                            onChange={handleDepositChecking}
                            onClick={depositToChecking}
                        />

                        <InputAndInfo
                            currency={userLoggedData.currency}
                            buttonCopy= "WITHDRAW"
                            valueAmount={withdrawChecking.amount}
                            valueInfo={withdrawChecking.info}
                            onChange={handleWithdrawChecking}
                            onClick={withdrawFromChecking}
                        />

                    </div>

                    <SendBetweenAccounts
                        value={sendingToSaving}
                        onChange={handleSendToSaving}
                        currency={userLoggedData.currency}
                        onClick={sendToSaving}
                        buttonCopy= "To saving"
                    />

                    <div className="bg-white text-black p-2 mt-16 mb-8 rounded-full md:w-4/6 w-full mx-auto">
                         <h3 className="uppercase text-base text-center">TRANSACTION HISTORY</h3>
                    </div>
                    <div className="flex justify-between">
                        <div className="w-full mb-8">
                            {checkingTransactionsHistory}
                        </div>
                    </div>
                    {/* <div onClick={logOut}>Log Out</div> */}
                    <div onClick={backHome}>Back home</div>
                    <div onClick={logOut}>log out</div>

                </div>
            </div>
        </>)
}

export default CheckingBalance
