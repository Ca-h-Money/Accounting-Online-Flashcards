import { TFlashcardData } from "../types/types";

/**
 * The complete flashcard dataset used in the app.
 * @constant {TFlashcardData} flashcardData
 */
const flashcardData: TFlashcardData = [
    {
        /**
         * Flashcard Set 1: Types of Accounts
         * @property {string} category - The name of the flashcard category.
         * @property {string} description - A brief description of the flashcard category.
         * @property {Array<Flashcard>} flashcards - An array of flashcards related to this category.
         */
        category: "Types of Accounts",
        description: "What type of account is the account listed?",
        flashcards: [
            { front: "Cash", back: ["Asset"] },
            { front: "Petty Cash", back: ["Asset"] },
            { front: "Accounts Receivable", back: ["Asset"] },
            { front: "Allowance for Uncollectible Accounts", back: ["Contra Asset"] },
            { front: "Notes Receivable", back: ["Asset"] },
            { front: "Interest Receivable", back: ["Asset"] },
            { front: "Supplies", back: ["Asset"] },
            { front: "Inventory", back: ["Asset"] },
            { front: "Prepaid Insurance", back: ["Asset"] },
            { front: "Prepaid Rent", back: ["Asset"] },
            { front: "Land", back: ["Asset"] },
            { front: "Building", back: ["Asset"] },
            { front: "Equipment", back: ["Asset"] },
            { front: "Accumulated Depreciation", back: ["Contra Asset"] },
            { front: "Accounts Payable", back: ["Liability"] },
            { front: "Notes Payable", back: ["Liability"] },
            { front: "Deferred or Unearned Revenue", back: ["Liability"] },
            { front: "Salaries Payable", back: ["Liability"] },
            { front: "Interest Payable", back: ["Liability"] },
            { front: "Utilities Payable", back: ["Liability"] },
            { front: "Common Stock", back: ["Equity"] },
            { front: "Owner's Capital", back: ["Equity"] },
            { front: "Service Revenue", back: ["Revenue"] },
            { front: "Sales Revenue", back: ["Revenue"] },
            { front: "Advertising Expense", back: ["Expense"] },
            { front: "Cost of Goods Sold", back: ["Expense"] },
            { front: "Supplies Expense", back: ["Expense"] },
            { front: "Insurance Expense", back: ["Expense"] },
            { front: "Salaries/Wage Expense", back: ["Expense"] },
            { front: "Utilities Expense", back: ["Expense"] },
        ],
    },
    {
        /**
         * Flashcard Set 2: Normal Balances
         */
        category: "Normal Balances",
        description: "What is the normal balance for the account listed? In other words, what increases that account (debit or credit)?",
        flashcards: [
            { front: "Cash", back: ["Debit"] },
            { front: "Petty Cash", back: ["Debit"] },
            { front: "Accounts Receivable", back: ["Debit"] },
            { front: "Notes Receivable", back: ["Debit"] },
            { front: "Interest Receivable", back: ["Debit"] },
            { front: "Supplies", back: ["Debit"] },
            { front: "Inventory", back: ["Debit"] },
            { front: "Prepaid Insurance", back: ["Debit"] },
            { front: "Prepaid Rent", back: ["Debit"] },
            { front: "Land", back: ["Debit"] },
            { front: "Building", back: ["Debit"] },
            { front: "Equipment", back: ["Debit"] },
            { front: "Accumulated Depreciation", back: ["Credit"] },
            { front: "Accounts Payable", back: ["Credit"] },
            { front: "Notes Payable", back: ["Credit"] },
            { front: "Deferred or Unearned Revenue", back: ["Credit"] },
            { front: "Salaries Payable", back: ["Credit"] },
            { front: "Interest Payable", back: ["Credit"] },
            { front: "Utilities Payable", back: ["Credit"] },
            { front: "Common Stock", back: ["Credit"] },
            { front: "Owner's Capital", back: ["Credit"] },
            { front: "Dividend", back: ["Debit"] },
            { front: "Withdrawal", back: ["Debit"] },
            { front: "Service Revenue", back: ["Credit"] },
            { front: "Sales Revenue", back: ["Credit"] },
            { front: "Advertising Expense", back: ["Debit"] },
            { front: "Cost of Goods Sold", back: ["Debit"] },
            { front: "Supplies Expense", back: ["Debit"] },
            { front: "Insurance Expense", back: ["Debit"] },
            { front: "Salaries/Wage Expense", back: ["Debit"] },
            { front: "Utilities Expense", back: ["Debit"] },
        ],
    },
    {
        /**
         * Flashcard Set 3: Journal Entries
         */
        category: "Journal Entries",
        description: "For each transaction, name which account would be debited and which would be credited.",
        flashcards: [
            { front: "Issued Common Stock", back: ["Debit is Cash", "Credit is Common Stock"] },
            { front: "Purchase a building with cash", back: ["Debit is Building", "Credit is Cash"] },
            { front: "Purchase a building using a Note Payable", back: ["Debit is Building", "Credit is Note Payable"] },
            { front: "Pay cash for advertising", back: ["Debit is Advertising Expense", "Credit is Cash"] },
            { front: "Repay a Note Payable", back: ["Debit is Note Payable", "Credit is Cash"] },
            { front: "Purchase supplies with cash", back: ["Debit is Supplies", "Credit is Cash"] },
            { front: "Purchase supplies on account", back: ["Debit is Supplies", "Credit is Accounts Payable"] },
            { front: "Provide services for cash", back: ["Debit is Cash", "Credit is Service Revenue"] },
            { front: "Provide services on account", back: ["Debit is Accounts Receivable", "Credit is Service Revenue"] },
            { front: "Receive cash for services that were previously provided on account", back: ["Debit is Cash", "Credit is Accounts Receivable"] },
            { front: "Pay for supplies that were previously purchased on account", back: ["Debit is Accounts Payable", "Credit is Cash"] },
            { front: "Receive cash in advance from customers (service has not yet been provided)", back: ["Debit is Cash", "Credit is Deferred or Unearned Revenue"] },
            { front: "Pay salaries to employees", back: ["Debit is Salaries Expense", "Credit is Cash"] },
            { front: "Pay cash dividends", back: ["Debit is Dividends", "Credit is Cash"] },
            { front: "Withdraw cash from the business", back: ["Debit is Withdrawals", "Credit is Cash"] },
            { front: "Invest cash into the business", back: ["Debit is Cash", "Credit is Owner's Capital"] },
            { front: "Prepay for one year of rent", back: ["Debit is Prepaid Rent", "Credit is Cash"] },
            { front: "Prepay for 6 months of insurance", back: ["Debit is Prepaid Insurance", "Credit is Cash"] },
            { front: "Purchase equipment with cash", back: ["Debit is Equipment", "Credit is Cash"] },
            { front: "Purchase equipment using a Note Payable", back: ["Debit is Equipment", "Credit is Notes Payable"] },
            { front: "Pay for equipment that was previously purchased with a Note Payable", back: ["Debit is Notes Payable", "Credit is Cash"] },
        ],
    }
];

export default flashcardData;
