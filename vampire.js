class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
  if (this.creator) {
    return this.creator.numberOfVampiresFromOriginal + 1;
  }
  return 0;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    
    const ancestors = function(vamp) {
      const output = { [vamp.name] : vamp };
      while (vamp.creator) {
        output[vamp.creator.name] = vamp.creator;
        vamp = vamp.creator;
      }
      return output;
    }

    const ancest1 = ancestors(this);
    const ancest2 = ancestors(vampire);
    for (const name of Object.keys(ancest1)) {
      if (Object.keys(ancest2).includes(name)) return ancest1[name]
    }

  }
}

module.exports = Vampire;

