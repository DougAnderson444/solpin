use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};
// use solana_program::{borsh};
use borsh::{BorshDeserialize, BorshSerialize};

pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
	fn pack(&self, dst: &mut [u8]) {
		let encoded = self.try_to_vec().unwrap();
		dst[..encoded.len()].copy_from_slice(&encoded);
	}
	fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
		Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
	}
}

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub struct Message {
	pub txt: String
}
impl Message {
    pub fn new(txt: String
	) -> Message {
        Message {
            txt
        }
    }
}
impl Serdes for Message {}

pub struct Processor;
impl Processor {
    pub fn process(
	program_id: &Pubkey,
	accounts: &[AccountInfo],
	instruction_data: &[u8],
) -> ProgramResult {
	let accounts_iter = &mut accounts.iter();
	let state_account = next_account_info(accounts_iter)?;
	let payer_account = next_account_info(accounts_iter)?;
	
	// make sure the user has control of the private key used to authorize changes
	if !payer_account.is_signer {
        msg!("Record authority signature missing");
        return Err(ProgramError::MissingRequiredSignature);
    }

	// Authorize State Account changes: check that seed + payer derives to state_account
	// since you can only pay if you have the private keys,
	// that means the payer has the private keys
	// PAYER + SEED + thisProgramID = STATE_ACCOUNT
	// seed can be public/same since payer private key is secret, and only one secret is needed
	// need the same derivation code in JS and Rust to generate (in client code) and check (here)

	// let _state_data = Message::try_from_slice(*state_account.data.borrow())?;

    let mut msg = Message::new("new".to_string()
					// , "seed".to_string()
					);

	let base = payer_account.key;
	let seed = "same seed in rust & javascript";
	let owner = program_id;
	let maybe_state_account = Pubkey::create_with_seed(base, seed, owner)?;

	if maybe_state_account != *state_account.key  // throw error, not authorized
	{
		msg!("Payer account is not the generator for this state account");
		return Err(ProgramError::InvalidAccountData);
	}

	let mut data = state_account.try_borrow_mut_data()?;


	let memo = String::from_utf8(instruction_data.to_vec()).map_err(|_| {
			msg!("Invalid UTF-8, from byte {}");
			ProgramError::InvalidInstructionData
	})?;
	
	let iter = memo.chars();
	let slice = iter.as_str();
	let mut txt_final = String::from(slice);
	txt_final.truncate(76);
	msg.txt = txt_final;

	msg.pack(&mut data);
	Ok(())
    }
}