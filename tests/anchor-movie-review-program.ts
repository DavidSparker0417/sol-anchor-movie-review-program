import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorMovieReviewProgram } from "../target/types/anchor_movie_review_program";
import { expect } from "chai";

describe("anchor-movie-review-program", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const movie = {
    title: "Just a test movie",
    description: "Wow what a good movie it was real great!",
    rating: 5
  }

  const program = anchor.workspace.AnchorMovieReviewProgram as Program<AnchorMovieReviewProgram>;

  const [moviePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from(movie.title), provider.wallet.publicKey.toBuffer()],
    program.programId
  )

  
  it("Movie review is added", async () => {
    const tx = await program.methods
      .addMoviewReview(movie.title, movie.description, movie.rating)
      .rpc()
    
    const account = await program.account.movieAccountState.fetch(moviePda)
    expect(account.title).to.equal(movie.title)
    expect(account.description).to.equal(movie.description)
    expect(account.rating).to.equal(movie.rating)
    expect(account.reviewer.toBase58()).to.equal(provider.wallet.publicKey.toBase58())
  })

  it("Movie review is updated", async () => {
    const newDescription = "Wow this is new."
    const newRating = 4

    const tx = await program.methods
      .updateMovieReview(movie.title, newDescription, newRating)
      .rpc()
    
    const account = await program.account.movieAccountState.fetch(moviePda)
    expect(account.title).to.equal(movie.title)
    expect(account.description).to.equal(newDescription)
    expect(account.rating).to.equal(newRating)
    expect(account.reviewer.toBase58()).to.equal(provider.wallet.publicKey.toBase58())
  })

  it("Deletes a movie review", async () => {
    const tx = await program.methods
      .deleteMovieReview(movie.title)
      .rpc()
  })
});
