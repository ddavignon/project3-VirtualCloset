using UnityEngine;
using System.Collections;

public class ExampleScript : MonoBehaviour
{
    public Animation anim;

    void Start()
    {
        // Get the walk animation state  and set its speed
        anim["walk"].speed = 2.0f;

        // Get the run animation state and set its weight
        anim["run"].weight = 0.5f;
    }
}
