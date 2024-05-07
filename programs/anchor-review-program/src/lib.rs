use anchor_lang::prelude::*;

declare_id!("Ht7WfCZuS4PtvboEzNRhSYs7n7Jw2FGKPMwjHu6bmcbr");

#[program]
pub mod anchor_review_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
