using UnityEngine;
using System.Collections;

public class ExampleClass : MonoBehaviour {
    void ApplyDamage(float msgContextID) {
        print(msgContextID);
    }
    void Example() {
        SendMessage("SndMsh", 5.0F);
    }
}

