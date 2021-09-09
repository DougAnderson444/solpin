use solana_program::{
    program_error::ProgramError,
    program_pack::{Pack, Sealed},
};
use borsh::{BorshDeserialize, BorshSerialize};
// use std::mem;

// pub trait Serdes: Sized + BorshSerialize + BorshDeserialize {
// 	fn pack(&self, dst: &mut [u8]) {
// 		let encoded = self.try_to_vec().unwrap();
// 		dst[..encoded.len()].copy_from_slice(&encoded);
// 	}
// 	fn unpack(src: &[u8]) -> Result<Self, ProgramError> {
// 		Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
// 	}
// }

#[derive(BorshSerialize, BorshDeserialize, PartialEq, Debug)]
pub struct Message {
	pub txt: String,
}

impl Message {
    pub fn new(src: String) -> Self {
        Message {
            txt: src
        }
    }
}

// impl Serdes for Message {}
// impl Sealed for Message {}
// impl Pack for Message {
//     const LEN: usize = 84; 

//     fn pack_into_slice(&self, dst: &mut [u8]) {
        
//     }

//     fn unpack_from_slice(src: &[u8]) -> Result<Self, ProgramError> {
//         // Serdes::unpack(src)
//         // Self::try_from_slice(src).map_err(|_| ProgramError::InvalidAccountData)
        
//         // works
//         Ok(Message{
//             txt: "a string".to_string()
//         })
//     }
// }