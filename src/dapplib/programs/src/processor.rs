use solana_program::{
	account_info::{next_account_info, AccountInfo},
	entrypoint::ProgramResult,
	msg,
	program_error::ProgramError,
	pubkey::Pubkey,
};
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
	pub txt: String,
}
impl Message {
    pub fn new() -> Message {
        Message {
            txt: "new".to_string()
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
	let account = next_account_info(accounts_iter)?;

	let mut data = account.try_borrow_mut_data()?;

    let mut msg = Message::new();

	let memo = String::from_utf8(instruction_data.to_vec()).map_err(|err| {
			msg!("Invalid UTF-8, from byte {}");
			ProgramError::InvalidInstructionData
	})?;
	
	let iter = memo.chars();
	let slice = iter.as_str();
	let mut txt_final = String::from(slice);
	txt_final.truncate(996);
	msg.txt = txt_final;

	msg.pack(&mut data);
	Ok(())
    }
}